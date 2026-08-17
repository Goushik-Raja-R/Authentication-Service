import { Router } from "express";

import { register,login,profile,deleteUser,refresh } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roles.middleware.js";

const authrouter = Router();

authrouter.post('/register',register);
authrouter.post('/login',login);
authrouter.post('/profile',authMiddleware,profile);
authrouter.delete('/delete/users/:id',authMiddleware,authorize("ADMIN"),deleteUser);
authrouter.post('/refresh',refresh);

export default authrouter;