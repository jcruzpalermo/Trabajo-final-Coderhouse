import storage from "../../daos/DAOFactory.js";
const productsStorage = storage().carrito;

const addProductToCart = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct;

        await productsStorage.addProduct(idUser, idProduct);
        
        return res.status(200).send({
            success: true,
            carrito: `Se agregó el producto correctamente`
        });
    } catch (err) {
        return res.status(404).send({
            success: false,
            carrito: `Error al agregar un producto`
        });
    }
};

const deleteCartById = async (req, res) => {
    try {
        const idCart = req.params.id;

        await productsStorage.deleteCartById(idCart);
        
        return res.status(200).send({
            success: true,
            carrito: `Se eliminó el carrito de forma correcta`
        });

    } catch (err) {
        return res.status(404).send({
            success: false,
            carrito: `Error al eliminar el carrito`
        });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct;

        await productsStorage.deleteProductById(idUser, idProduct);

        return res.status(200).send({
            success: true,
            carrito: `Producto eliminado correctamente`
        });
    } catch (err) {

        return res.status(404).send({
            success: false,
            carrito: `Error al eliminar un producto específico de un carrito`
        });
    }
};

const viewCart = async (req, res) => {
    const userLog = req.user;

    if (userLog.carrito.length == 0) {
        return res.status(200).send({
            success: true,
            carrito: `El carrito se encuentra vacío`
        });
    } else {
        return res.status(200).send({
            success: true,
            carrito: userLog.carrito
        });
    }
};

export { addProductToCart,
    deleteCartById,
    deleteProductById,
    viewCart }