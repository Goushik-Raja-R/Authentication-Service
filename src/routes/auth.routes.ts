import { Router } from "express";

import { register,login,profile,deleteUser,refresh,logout,logoutAll } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerMiddleware,loginMiddleware,refreshMiddleware } from "../middlewares/validation.middleware.js";
import { authorize } from "../middlewares/roles.middleware.js";

const authrouter = Router();

authrouter.post('/register',registerMiddleware,register);
authrouter.post('/login',loginMiddleware,login);
authrouter.post('/profile',authMiddleware,profile);
authrouter.delete('/delete/users/:id',authMiddleware,authorize("ADMIN"),deleteUser);
authrouter.post('/refresh',refreshMiddleware,refresh);
authrouter.post('/logout',logout)
authrouter.post('/logoutAll',logoutAll)

export default authrouter;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQwLCJpYXQiOjE3ODcwNzA4OTgsImV4cCI6MTc4NzY3NTY5OH0.3dlRXMZx6nI3A1mlPBHr0dcI62jAeH-bIXNQUfh-tDM

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQwLCJpYXQiOjE3ODcwNzA5MjYsImV4cCI6MTc4NzY3NTcyNn0.xNWjgZ1aKXwZGNMdGarOA8245YGVE7guWCdgs3VPb9w

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQwLCJpYXQiOjE3ODcwNzA5NDEsImV4cCI6MTc4NzY3NTc0MX0.ftiFq-2Q59cKDynVeXyC1kHOcpzCQBbmGXvUUkNAXBE