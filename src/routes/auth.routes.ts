import { Router } from "express";
import type { Request,Response } from "express";
import { register,login,profile,deleteUser,refresh,logout,logoutAll } from "../controllers/auth.controller.js";
import { authMiddleware,authorizeDeleteUser } from "../middlewares/auth.middleware.js";
import { registerMiddleware,loginMiddleware,refreshMiddleware } from "../middlewares/validation.middleware.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";

const authrouter = Router();

authrouter.post('/register',authLimiter,registerMiddleware,register);
authrouter.post('/login',authLimiter,loginMiddleware,login);
authrouter.post('/profile',authMiddleware,profile);
authrouter.delete('/delete/users/:id',authMiddleware,authorizeDeleteUser,deleteUser);
authrouter.post('/refresh',authLimiter,refreshMiddleware,refresh);
authrouter.post('/logout',logout)
authrouter.post('/logoutAll',logoutAll)

authrouter.get("/test-error", (req:Request,res:Response) => {
    throw new Error("Testing unexpected server error");
});

export default authrouter;
