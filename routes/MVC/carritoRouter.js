import { Router } from "express";

import {
    viewCart,
    addProductToCart,
    deleteCartById,
    deleteProductById, } from "../../controller/MVC/carritoController";

    const carritoRouter = Router();

carritoRouter.get(`/`, viewCart);
carritoRouter.post(`/addProduct`, addProductToCart);
carritoRouter.post(`/deleteProduct`, deleteProductById);
carritoRouter.delete(`/:id`, deleteCartById);

export default carritoRouter;