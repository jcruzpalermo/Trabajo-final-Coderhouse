import mongoDB from "../../dataBase/options/mongoDB.js";
import messageModel from "../../dataBase/models/message.js";
import CrudMongoDB from "../../dataBase/CrudMongoDB/crudMessage.js";

class MessageDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, messageModel);
    };
};

export default MessageDAOMongoDB;