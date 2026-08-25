import type { Request,Response,NextFunction } from "express";
import { logger } from "../utils/logger.js";
import crypto from 'node:crypto'

export const requestLogger = (req:Request,res:Response,next:NextFunction)=>{

    const startTime = Date.now()

    res.on("finish",()=>{
        const endTime = Date.now();
        const url = req.url;
        const method = req.method;
        const statusCode = res.statusCode;
        const duration = endTime-startTime

        logger.info(`${req.reqId} ${method} ${url}/ ${statusCode} ${duration}ms`)
    })
    next();
}

export const generateRequestID = (req:Request,res:Response,next:NextFunction)=>{
        req.reqId = crypto.randomUUID();
        next();
}