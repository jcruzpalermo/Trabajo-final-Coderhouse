import express  from "express"; 
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";

const app = express();

import passport from "passport";
import  log4js  from "./utils/logs.js";
import MongoStore from "connect-mongo";

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

import socketIoChat from "./sockets/socketChat.js";
import cluster from "cluster"; 
import os from "os";

const numCPUs = os.cpus().length;

app.use(express.static(`./public`));
app.use("/api", express.static("./public"));
app.use("/error", express.static("./public"));
app.use("/api/productos", express.static("./public"));
app.use("/chat/individual", express.static("./public"));
app.use("/api/productos/categoria", express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

import session from "express-session";

//Middleware: session

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO,
        ttl: 10,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));

app.use(passport.session());

const args = parseArgs(process.argv.slice(2));

//Views
app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

//Logg console / warm 
const loggerConsole = log4js.getLogger(`default`);
const loggerArchiveWarn = log4js.getLogger(`warnArchive`);
const loggerArchiveError = log4js.getLogger(`errorArchive`);

//Run server
const CLUSTER = args.CLUSTER;
const PORT = process.env.PORT || 8080;

const runServer = (PORT) => {
    httpServer.listen(PORT, () => loggerConsole.debug(`Servidor escuchando el puerto ${PORT}`));
}

if (CLUSTER) {
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on(`exit`, (worker, code, signal) => {
            cluster.fork();
        });
    } else {
        runServer(PORT);
    }
} else {
    runServer(PORT);
}

app.use((req, res, next) => {
    loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);
    next();
});

//Log session
const isLogged = ((req, res, next) => {
    let msgError = `Para acceder a esta URL debe iniciar sesión`
    if (req.user) {
        next();
    } else {
        return res.render('viewError', { msgError })
    }
});

//Routers import MVC

import productosRouter from "./routes/MVC/productosRouter.js";
import carritoRouter from "./routes/MVC/carritoRouter.js";
import { loginRouter, signupRouter, logoutRouter, profileRouter } from "./routes/MVC/userRouter.js";
import generalViewsRouter from "./routes/MVC/generalViewsRouter.js";
import ordenesRouter from "./routes/MVC/ordenesRouter.js";
import chatRouter from "./routes/MVC/chatRouter.js";


//Routers MVC
app.use(`/`, generalViewsRouter);
app.use(`/api/productos`, isLogged, productosRouter);
app.use(`/api/carrito`, isLogged, carritoRouter);
app.use(`/api/ordenes`, isLogged, ordenesRouter);
app.use(`/chat`, isLogged, chatRouter);
app.use(`/login`, loginRouter);
app.use(`/signup`, signupRouter);
app.use('/logout', isLogged, logoutRouter);
app.use(`/profile`, isLogged, profileRouter);


//Socket chat:
socketIoChat(io);

app.use((req, res) => {
    loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);

    loggerArchiveWarn.warn(`Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`);
    const msgError = `Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`;

    res.render(`viewError`, { msgError });
});