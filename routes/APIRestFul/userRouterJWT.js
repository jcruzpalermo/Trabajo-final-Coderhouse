import { Router } from "express"
import jwetStr from "../../authenticationJWT/passport.js";

import { loginJWTController,
    registerJWTController } from "../../controller/APIRestFul/userControllerJWT.js";

//Authentication
jwetStr();

const loginJWTRouter = Router();
const registerJWTRouter = Router();

//Login
loginJWTRouter.post(`/`, loginJWTController);
registerJWTRouter.post(`/`, registerJWTController);

export { loginJWTRouter,
    registerJWTRouter }
