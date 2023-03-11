import { Router } from "express"
import jwetStr from "../../authenticationJWT/passport";
import authorizationJWT from "../../middleware/authenticateJWT";

import {   viewCart,
    addProductToCart,
    deleteCartById,
    deleteProductById, } from "../../controller/APIRestFul/carritoControllerjwt";

//Authentication
jwetStr();

const carritoRouter = Router();

carritoRouter.get(`/`,authorizationJWT, viewCart);
carritoRouter.post(`/addProduct`,authorizationJWT, addProductToCart);
carritoRouter.delete(`/deleteProduct`,authorizationJWT, deleteProductById);
carritoRouter.delete(`/:id`,authorizationJWT, deleteCartById);

export default carritoRouter;