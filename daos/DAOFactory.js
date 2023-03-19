import ProductosDAOMongoDB from "./productos/ProductosDAOMongoDB.js";
import CarritoDAOMongoDB from "./carritos/CarritoDAOMongoDB.js";
import OrdenesDAOMongoDB from "./ordenes/OrdenesDAOMongoDB.js";
import MessagesDAOMongoDB from "./mensajes/MessageDAOMongoDB.js";

const getStorage = () => {
    const storage = `MongoDb`;
    switch (storage) {
        case `MongoDB`:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB(),
                mensajes: new MessagesDAOMongoDB()
            }
            break

        default:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB(),
                mensajes: new MessagesDAOMongoDB()
            }
            break
    }
}

export default getStorage;