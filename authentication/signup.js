import passport from "passport";
import sendEmail from "../utils/nodemailerGmail";
import dotenv from "dotenv";
dotenv.config();
import LocalStrategy from "passport-local"
LocalStrategy.Strategy;
import UserModel from "../dataBase/models/user";
import { createHash } from "../utils/utils";

const signup = () => {
    passport.use('signup', new LocalStrategy({
        //Configuración para obtener todo el req.
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({ $or: [{ username }, { email: req.body.email }, { telefono: req.body.tel }] });
            if (user || password != req.body.password2) {
                return done(null, false);
            }

            const newUser = new UserModel();
            newUser.username = username;
            newUser.password = createHash(password); //No se puede volver a conocer la contraseña luego de realizarle el hash
            newUser.email = req.body.email;
            newUser.telefono = req.body.tel;
            newUser.edad = req.body.edad;
            newUser.direccion = req.body.direccion;
            newUser.foto = req.file.filename;
            newUser.carrito = [];
            newUser.admin = false;

            const mailOptions = {
                from: process.env.EMAIL,
                to: `jcruzpalermo@gmail.com`,
                subject: `Nuevo registro`,
                html: `
                    <h3>Nuevo registro de usuario!</h3>
                    <p> Datos:</p>
                    <ul>
                    <li> Nombre: ${newUser.username}</li>
                    <li> Email: ${newUser.email}</li>
                    <li> Teléfono: ${newUser.telefono}</li>
                    <li> Edad: ${newUser.edad}</li>
                    <li> Direccion: ${newUser.direccion}</li>
                    </ul>
                `
            };

            const userSave = await newUser.save();
            const email = await sendEmail(mailOptions);
            return done(null, userSave);
        }
        catch (err) {
            loggerArchiveError.error(err);
            done(err);
        }
    }));
}

export default signup;