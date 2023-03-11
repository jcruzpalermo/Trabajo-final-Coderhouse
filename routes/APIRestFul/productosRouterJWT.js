import { Router } from "express";
import jwetStr from "../../authenticationJWT/passport";
import authorizationJWT from "../../middleware/authenticateJWT";

import {  getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
    getProductsBtCategory } from "../../controller/APIRestFul/productosControllersJWT";

//Authentication
jwetStr();

const productosRouter = Router();

productosRouter.get(`/`,  authorizationJWT, getAllProducts);
productosRouter.get(`/:id`,authorizationJWT, getProductById);
productosRouter.get(`/categoria/:categoria`,authorizationJWT, getProductsBtCategory);
productosRouter.post(`/`,authorizationJWT, addProduct);
productosRouter.put(`/:id`,authorizationJWT, updateProductById);
productosRouter.delete(`/:id`,authorizationJWT, deleteProductById);

export default productosRouter;