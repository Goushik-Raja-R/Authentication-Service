import { Router } from "express";

import { register,login,profile,deleteUser,refresh,logout,logoutAll } from "../controllers/auth.controller.js";
import { authMiddleware,authorizeDeleteUser } from "../middlewares/auth.middleware.js";
import { registerMiddleware,loginMiddleware,refreshMiddleware } from "../middlewares/validation.middleware.js";

const authrouter = Router();

authrouter.post('/register',registerMiddleware,register);
authrouter.post('/login',loginMiddleware,login);
authrouter.post('/profile',authMiddleware,profile);
authrouter.delete('/delete/users/:id',authMiddleware,authorizeDeleteUser,deleteUser);
authrouter.post('/refresh',refreshMiddleware,refresh);
authrouter.post('/logout',logout)
authrouter.post('/logoutAll',logoutAll)

export default authrouter;
