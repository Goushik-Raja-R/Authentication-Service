import { Router } from "express";
import type { Request,Response } from "express";
import { register,login,profile,deleteUser,refresh,logout,logoutAll } from "../controllers/auth.controller.js";
import { authMiddleware,authorizeDeleteUser } from "../middlewares/auth.middleware.js";
import { registerMiddleware,loginMiddleware,refreshMiddleware } from "../middlewares/validation.middleware.js";
import { loginLimiter,registerLimiter,refreshLimiter } from "../middlewares/rateLimit.middleware.js";

const authrouter = Router();

authrouter.post('/register',registerLimiter,registerMiddleware,register);
authrouter.post('/login',loginLimiter,loginMiddleware,login);
authrouter.post('/profile',authMiddleware,profile);
authrouter.delete('/delete/users/:id',authMiddleware,authorizeDeleteUser,deleteUser);
authrouter.post('/refresh',refreshLimiter,refreshMiddleware,refresh);
authrouter.post('/logout',refreshMiddleware,logout)
authrouter.post('/logoutAll',refreshMiddleware,logoutAll)

authrouter.get("/test-error", (req:Request,res:Response) => {
    throw new Error("Testing unexpected server error");
});

export default authrouter;
