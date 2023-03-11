import mongoDB from "../../dataBase/options/mongoDB";
import productsModel from "../../dataBase/models/producto";
import CrudMongoDB from "../../dataBase/crudMongoDB/crudProductos";

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

export default ProductosDAOMongoDB;