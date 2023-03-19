import mongoDB from "../../dataBase/options/mongoDB.js";
import productsModel from "../../dataBase/models/producto.js";
import userModel from "../../dataBase/models/user.js";

import CrudMongoDB from "../../dataBase/CrudMongoDB/crudCarritos.js";

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel);
    };
};

export default CarritoDAOMongoDB;