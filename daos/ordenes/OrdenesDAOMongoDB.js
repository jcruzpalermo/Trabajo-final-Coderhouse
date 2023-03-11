import mongoDB from "../../dataBase/options/mongoDB";
import productsModel from "../../dataBase/models/producto";
import userModel from "../../dataBase/models/user";
import ordenModel from "../../dataBase/models/ordenes";

import CrudMongoDB from "../../dataBase/crudMongoDB/crudOrdenes"

class OrdenesDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel, ordenModel);
    };
};

export default OrdenesDAOMongoDB;