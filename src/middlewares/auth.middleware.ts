import type { Request,Response,NextFunction } from "express";
import AppError from "../errors/AppError.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.js";
import type { AuthUser } from "../types/auth.types.js";

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{

        let checkToken:string;

        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new AppError("Unauthorized",401);
        }

        const token = authHeader.trim().split(" ");

        if(token.length === 2 && token[0]==="Bearer"){
            checkToken = token[1];
        }else{
            throw new AppError("Unauthorized",401);
        }

        try{
            const result =  jwt.verify(checkToken,JWT_SECRET_KEY) as AuthUser;
            req.user = result;
            next();
        }
        catch(error){
            throw new AppError("Unauthorized",401);
        }
}