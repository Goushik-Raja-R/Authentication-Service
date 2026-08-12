import type { Request,Response,NextFunction } from "express";

export const authorize = (roles:string) =>{
    return (req:Request,res:Response,next:NextFunction)=>{

        if(req.user === undefined){
            return res.status(401).json({
                message:"Unauthorized user"
            })
        }

        if(req.user.role !== roles){
            return res.status(403).json({
                message:"Access Denied"
            })
        }
        next();
    }
}