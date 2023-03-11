import { Router } from "express";
import login from "../../authentication/login";
import signup from "../../authentication/signup";
import serializeUser from "../../authentication/serializeUser";
import deserializeUser from "../../authentication/deserializeUser";
import passport from "passport";

import {     
    signupFormController,
    loginFormController,
    logoutController,
    profileController } from "../../controller/MVC/userController";

//Multer
import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/avatar')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

//Authentication
login();
signup();
serializeUser();
deserializeUser();

const loginRouter = Router();
const signupRouter = Router();
const logoutRouter = Router();
const profileRouter = Router();

//Login
loginRouter.get(`/`, loginFormController);
loginRouter.post('/', passport.authenticate('login', { //indicamos el controlador de passport, llega desde el formulario de login.
    successRedirect: '/bienvenida', //redirect es con método get, vamos a home.
    failureRedirect: `/error/Error al iniciar sesión usuario, contraseña incorrecta`, // redirect es con método get, vamos a /login de get.
    failureFlash: true  // nos permite enviar mensajes.
}));

//Signup
signupRouter.get(`/`, signupFormController);
signupRouter.post('/', upload.single('avatar'), passport.authenticate('signup', {//indicamos el controlador de passport, llega desde el formulario de signup.
    successRedirect: '/', // redirect es con método get, vamos a home.
    failureRedirect: `/error/Error al crear la cuenta: usuario, email, telefono repetido, contraseña no coincide`, // redirect es con método get, vamos a /signup de signup.
    failureFlash: true // nos permite enviar mensajes.
}));

//Profile
profileRouter.get(`/`, profileController);

//Logout
logoutRouter.get(`/`, logoutController);

export {    
    signupRouter,
    loginRouter,
    logoutRouter,
    profileRouter }