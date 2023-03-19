import { Router } from "express";
import {
    getChat,
    chatIndividual,
    chatGrupal, } from "../../controller/MVC/chatController.js";

    const chatRouter = Router();

    chatRouter.get(`/`, getChat);
    chatRouter.get(`/grupal`, chatGrupal);
    chatRouter.get(`/individual`, chatIndividual);

export default chatRouter;