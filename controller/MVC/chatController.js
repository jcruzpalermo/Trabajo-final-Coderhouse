import storage from "../../daos/DAOFactory.js";
import MessageDTO from "../../DTOs/MessageDTO.js";
const mensajesStorage = storage().mensajes;

const getChat = (req, res) => res.render('chat');

const chatIndividual = async (req, res) => {
    const userLog = req.user.username;
    const allMessageUserLog = await mensajesStorage.getById(userLog);

    //Normalizo los datos:
    const allMessageUserLogDTO = allMessageUserLog.map(message => new MessageDTO(message));

    return res.render(`mensajesEnviados`, { allMessageUserLogDTO });
};

const chatGrupal = (req, res) => {
    const userLog = req.user.username;
    return res.redirect(`/chat?aliasName=${userLog}`);
};

export {
    getChat,
    chatIndividual,
    chatGrupal,
}