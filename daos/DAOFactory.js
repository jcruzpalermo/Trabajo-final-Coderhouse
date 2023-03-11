import ProductosDAOMongoDB from "./productos/ProductosDAOMongoDB";
import CarritoDAOMongoDB from "./carritos/CarritoDAOMongoDB";
import OrdenesDAOMongoDB from "./ordenes/OrdenesDAOMongoDB";
import MessagesDAOMongoDB from "./mensajes/MessageDAOMongoDB";

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