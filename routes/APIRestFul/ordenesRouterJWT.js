import { Router } from "express";
import jwetStr from "../../authenticationJWT/passport-js";
import authorizationJWT from "../../middleware/authenticateJWT.js";

import {  viewOrdenesController,
    createOrdenController, } from "../../controller/APIRestFul/ordenesControllerJWT.js";

//Authentication
jwetStr();

const ordenesRouter = Router();

ordenesRouter.get(`/`, authorizationJWT, viewOrdenesController);
ordenesRouter.post(`/`, authorizationJWT, createOrdenController);

export default ordenesRouter;