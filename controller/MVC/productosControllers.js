import storage from "../../daos/DAOFactory.js";
import ProductDTO from "../../DTOs/ProductoDTO.js";
const productsStorage = storage().productos;

const addProduct = async (req, res) => {
    if (userLog.admin) {
        try {
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.link;
            const description = req.body.descripcion;
            const date = new Date().toDateString();
            const category = req.body.categoria;

            const newProducto = {
                timestamp: date,
                nombre: `${name}`,
                descripcion: `${description}`,
                link: `${url}`,
                precio: price,
                categoria: category,
                cantidad: 0
            };
            const id = await productsStorage.save(newProducto);

            return res.redirect(`/api/productos`);
        } catch (err) {
            return res.status(404).json({
                error: `Error al crear un producto ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        userLog = req.user;
        let allProducts = await productsStorage.getAll();

        //Normalizo los datos:
        const allProductsDTO = allProducts.map(product => new ProductoDTO(product));

        return res.render(`productos`, { allProductsDTO, userLog });
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener todos los productos${err}`
        });
    }
};

const getProductById = async (req, res) => {
    try {
        let id = req.params.id;
        let productbyId = await productsStorage.getById(id);

        //Normalizo los datos:
        const productbyIdDTO = new ProductoDTO(productbyId);

        if (!productbyIdDTO) {
            return res.status(404).json({
                error: `Error producto no encontrado`
            });
        } else {
            return res.render(`productosById`, { productbyIdDTO });
        }
    } catch (err) {
        let msgError = `El ID ingresado no existe`;
        return res.render(`viewError`, { msgError });
    }
};

const updateProductById = async (req, res) => {
    if (userLog.admin) {
        try {
            const idProduct = req.params.id;
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.link;
            const description = req.body.descripcion;
            const date = new Date().toDateString();
            const categoria = req.body.categoria;

            await productsStorage.updateById(idProduct, name, price, url, description, date, categoria);

            return res.json(`Se actualizó el producto `);
        } catch (err) {
            return res.status(404).json({
                error: `Error al actualizar un producto ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
};

const deleteProductById = async (req, res) => {
    if (userLog.admin) {
        try {
            const id = req.params.id;
            await productsStorage.deleteById(id);

            return res.redirect(`/api/productos`);
        } catch (err) {
            return res.status(404).json({
                error: `Error al borrar un producto por id ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
};

const viewUpdateProduct = (req, res) => {
    const { idProduct, nameProduct, descripcionProduct, precioProducto, categoryProduct, linkProduct } = req.body;
    const product = {
        id: idProduct,
        nombre: nameProduct,
        descripcion: descripcionProduct,
        precio: precioProducto,
        categoria: categoryProduct,
        link: linkProduct
    }
    return res.render(`modificarProducto`, { product });
};

const getProductsBtCategory = async (req, res) => {
    try {
        const userLog = req.user;
        const category = req.params.categoria;
        const allProducts = await productsStorage.getAll();
        const allProductsDTO = [];

        //Normalizo los datos:
        allProducts.forEach(product => {
            if (product.categoria == category) {
                allProductsDTO.push(new ProductoDTO(product));
            }
        });

        return res.render(`productosByCategory`, { allProductsDTO, userLog });
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener todos los productos${err}`
        });
    }
};

export {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
    viewUpdateProduct,
    getProductsBtCategory
}