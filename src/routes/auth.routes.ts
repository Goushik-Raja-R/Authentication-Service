import { Router } from "express";

import { register,login,profile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewre.js";

const authrouter = Router();

authrouter.post('/register',register);
authrouter.post('/login',login)
authrouter.post('/profile',authMiddleware,profile);


export default authrouter;