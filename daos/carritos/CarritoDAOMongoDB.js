import mongoDB from "../../dataBase/options/mongoDB";
import productsModel from "../../dataBase/models/producto";
import userModel from "../../dataBase/models/user";

import CrudMongoDB from "../../dataBase/CrudMongoDB/crudCarritos";

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel);
    };
};

export default CarritoDAOMongoDB;