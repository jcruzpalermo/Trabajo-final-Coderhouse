import mongoose from "mongoose";

import storage from "../daos/DAOFactory";
import MessageDTO from "../DTOs/MessageDTO";

const storageMessages = storage().mensajes;

//Instancia contenedores:

let users = [];

const socketIoChat = (io) => {
    io.on(`connection`, socket => {

        //Cliente --> Servidor: joinChat event
        socket.on(`joinChat`, async ({ aliasName }) => {
            users.push({
                id: socket.id,
                aliasName: aliasName,
                avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
            });

            //Servidor --> Cliente : bienvenida al usuario que se conecta.
            socket.emit(`notification`, `Bienvenido ${aliasName}`);

            const allMessageFromDB = await storageMessages.getAll();

             //Normalizo los datos:
            const allMessageDTO = allMessageFromDB.map(message => new MessageDTO(message));

            //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
            socket.emit(`allMenssage`, allMessageDTO);


            //Servidor --> Cliente : bienvenida a todos los usuarios menos al que inicio la conexión:
            socket.broadcast.emit(`notification`, `${aliasName} se ha unido al chat`);

            //Servidor --> cliente: enviamos a todos los usuarios la lista actualizada de participantes:
            io.sockets.emit(`users`, users);
        });

        //Cliente --> Servidor: messageInput event
        socket.on(`messageInput`, async data => {
            let date = new Date();
            const user = users.find(user => user.id === socket.id);

            const newMessage = {
                autor: user.aliasName,
                text:data,
                timestamp:date
            }

            await storageMessages.save(newMessage);

            //Servidor --> Cliente: envio mensaje
            socket.emit(`message`, newMessage);

            socket.broadcast.emit(`message`, newMessage);
        });

        // Cliente --> Servidor: un cliente se desconecta.
        socket.on('disconnect', reason => {
            const user = users.find(user => user.id === socket.id);
            users = users.filter(user => user.id !== socket.id);

            if (user) {
                socket.broadcast.emit(`notification`, `${user.aliasName} se ha ido del chat`);
            }

            io.sockets.emit(`users`, users);
        });
    });

}

export default socketIoChat;