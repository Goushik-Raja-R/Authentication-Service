import type { Request,Response,NextFunction } from "express";
import type { RegisterUser } from "../types/user.types.js";
import AppError from "../errors/AppError.js";

export const registerMiddleware = (req:Request,res:Response,next:NextFunction)=>{

        const allowedFields = ['name','email','password'];

        if(req.body !== Object && req.body === null){
            throw new AppError("Invalid User Details",400)
        }

        const isValidFields = Object.keys(req.body).every((key)=>{
            return allowedFields.includes(key);
        })

        if(isValidFields === false){
            throw new AppError("Invalid User Details",400)
        }

        const {name,email,password} = req.body as RegisterUser

        if(typeof name === "string" && typeof email === "string" && typeof password === "string"){

            const checkName:boolean = isValidName(name);
            const checkEmail:boolean = isValidEmail(email);
            const checkPassword:boolean = isValidPassword (password);

            if(checkName === false){
                throw new AppError("Invalid Name",400);
            }

            if(checkEmail === false){
                throw new AppError("Invalid Email",400);
            }

            if(checkPassword === false){
                throw new AppError("Invalid Password",400);
            }
              next();
        }
        else{
            throw new AppError("Invalid User Details",400)
        }
}

export const loginMiddleware = (req:Request,res:Response,next:NextFunction)=>{

        const {email,password} = req.body;

        if(typeof email === "string" && typeof password === "string"){
            const checkEmail:boolean = isValidEmail(email);
            const checkPassword:boolean = password.length >0;

            if(checkEmail === false){
                throw new AppError("Invalid email",400);
            }

            if(checkPassword === false){
                throw new AppError("Invalid Password",400)
            }
            next();
        }
        else{
             throw new AppError("Invalid Login Details",400);
        }
}

export const refreshMiddleware = (req:Request,res:Response,next:NextFunction)=>{
        
        const {refreshtoken} = req.body;

        if(typeof refreshtoken === "string" && refreshtoken.trim().length>0){
            next();
        }
         else{
            throw new AppError("Invalid Token",400);
        }
}

function isValidName(name:string):boolean{
    
    const trimmed = name.trim();
    const nameRegex = /^[A-Za-z ]+$/

    return(trimmed.length >= 2 && trimmed.length <= 50 && nameRegex.test(trimmed));
}

function isValidEmail(email:string):boolean{
    if(!email || email.length > 254){
        return false
    }

    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailregex.test(email);
}

function isValidPassword(password:string):boolean{
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;

    return passwordRegex.test(password);
}