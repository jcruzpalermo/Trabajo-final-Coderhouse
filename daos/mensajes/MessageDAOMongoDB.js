import mongoDB from "../../dataBase/options/mongoDB";
import messageModel from "../../dataBase/models/message";
import CrudMongoDB from "../../dataBase/CrudMongoDB/crudMessage";

class MessageDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, messageModel);
    };
};

export default MessageDAOMongoDB;