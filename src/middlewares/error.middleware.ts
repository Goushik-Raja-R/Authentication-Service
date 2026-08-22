import type { Request,Response,NextFunction } from "express";
import AppError from "../errors/AppError.js";

export const errorHandler = (error:unknown,req:Request,res:Response,next:NextFunction) =>{

    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            message:error.message
        })
    }else{
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })

    }
}