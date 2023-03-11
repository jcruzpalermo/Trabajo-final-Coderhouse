import { Router } from "express";

import {     
    homeController,
    signupController,
    bienvenidaController,
    viewFormAddProductController,
    viewDataServerController,
    sobreNosotrosController,
    viewErrorController } from "../../controller/MVC/generalViewsCotroller";

    const viewsRouter = Router();

    //My middleware
    const isLogged = ((req, res, next) => {
        let msgError = `Para acceder a esta URL debe iniciar sesión`
        if (req.user) {
            next();
        } else {
            return res.render('viewError', { msgError })
        }
    });
    
    viewsRouter.get(`/`, homeController);
    viewsRouter.get(`/signup`, signupController);
    viewsRouter.get('/bienvenida',isLogged, bienvenidaController);
    viewsRouter.get('/formAddProduct',isLogged, viewFormAddProductController);
    viewsRouter.get('/serverData',isLogged, viewDataServerController);
    viewsRouter.get('/sobreNosotros', sobreNosotrosController);
    viewsRouter.get('/error/:msg', viewErrorController);

export default viewsRouter;
