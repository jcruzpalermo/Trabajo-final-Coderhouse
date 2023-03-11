import { Router } from "express";
import jwetStr from "../../authenticationJWT/passport";
import authorizationJWT from "../../middleware/authenticateJWT";

import {  viewOrdenesController,
    createOrdenController, } from "../../controller/APIRestFul/ordenesControllerJWT";

//Authentication
jwetStr();

const ordenesRouter = Router();

ordenesRouter.get(`/`, authorizationJWT, viewOrdenesController);
ordenesRouter.post(`/`, authorizationJWT, createOrdenController);

export default ordenesRouter;