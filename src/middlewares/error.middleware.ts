import type { Request,Response,NextFunction } from "express";
import AppError from "../errors/AppError.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (error:unknown,req:Request,res:Response,next:NextFunction) =>{

    if(error instanceof AppError){

        logger.warn(`${req.reqId} ${req.method} ${req.url} ${error.message} ${error.statusCode}`)

        return res.status(error.statusCode).json({
            message:error.message
        })
    }else{
        logger.error(`${req.reqId} ${req.method} ${req.url}`,error);
        return res.status(500).json({
            message:"Internal Server Error"
        })

    }
}