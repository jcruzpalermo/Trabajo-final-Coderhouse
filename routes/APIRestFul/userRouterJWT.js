import { Router } from "express"
import jwetStr from "../../authenticationJWT/passport";

import { loginJWTController,
    registerJWTController } from "../../controller/APIRestFul/userControllerJWT";

//Authentication
jwetStr();

const loginJWTRouter = Router();
const registerJWTRouter = Router();

//Login
loginJWTRouter.post(`/`, loginJWTController);
registerJWTRouter.post(`/`, registerJWTController);

export { loginJWTRouter,
    registerJWTRouter }
