import storage from "../../daos/DAOFactory";
import ProductoDTO from "../../DTOs/ProductoDTO";

const productsStorage = storage().productos;

const addProduct = async (req, res) => {
    if (req.user.admin) {
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

            return res.status(200).send({
                success: true,
                message: `Se agregó correctamente el producto`
            });

        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Error al crear un producto `
            });
        }
    } else {
        return res.status(404).send({
            success: false,
            message: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        let allProducts = await productsStorage.getAll();

        //Normalizo los datos:
        const allProductsDTO = allProducts.map(product => new ProductoDTO(product));

        return res.status(200).send({
            success: true,
            products: allProductsDTO
        });

    } catch (err) {
        return res.status(404).send({
            success: false,
            message: `Error al obtener los productos`
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

            return res.status(404).send({
                success: false,
                message: `Error producto no encontrado`
            });

        } else {
            return res.status(200).send({
                success: true,
                product: productbyIdDTO
            });
        }
    } catch (err) {
        return res.status(404).send({
            success: false,
            message: `El ID ingresado no existe`
        });
    }
};

const updateProductById = async (req, res) => {
    if (req.user.admin) {
        try {
            const idProduct = req.params.id;
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.thumbnail;
            const description = req.body.descripcion;
            const date = new Date().toDateString();
            const categoria = req.body.categoria;;

            await productsStorage.updateById(idProduct, name, price, url, description, date, categoria);

            return res.status(200).send({
                success: true,
                message: `Se actualizó el producto`
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Error al actualizar el producto`
            });
        }
    } else {
        return res.status(404).send({
            success: false,
            message: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
};

const deleteProductById = async (req, res) => {
    if (req.user.admin) {
        try {
            const id = req.params.id;
            await productsStorage.deleteById(id);

            return res.status(200).send({
                success: true,
                message: `El producto se borro correctamente`
            });

        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Error al borrar un producto por id`
            });
        }
    } else {
        return res.status(404).send({
            success: false,
            message: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
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


        if (allProductsDTO.length > 0) {
            return res.status(200).send({
                success: true,
                products: allProductsDTO
            });
        } else {
            return res.status(200).send({
                success: true,
                message: `No se encuentra el producto con dicho filtro`
            });
        }

    } catch (err) {
        return res.status(404).send({
            success: false,
            message: `Error al filtrar producto`
        });
    }
};

export {  getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
    getProductsBtCategory }