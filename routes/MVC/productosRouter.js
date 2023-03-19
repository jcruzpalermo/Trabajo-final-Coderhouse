import {
    Router
} from "express";

import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
    viewUpdateProduct,
    getProductsBtCategory } from "../../controller/MVC/productosControllers.js";


const productosRouter = Router();

productosRouter.get(`/`, getAllProducts);
productosRouter.get(`/:id`, getProductById);
productosRouter.get(`/categoria/:categoria`, getProductsBtCategory);
productosRouter.post(`/modificar`, viewUpdateProduct);
productosRouter.post(`/`, addProduct);
productosRouter.put(`/:id`, updateProductById);
productosRouter.delete(`/:id`, deleteProductById);

export default productosRouter;