import type { Request,Response,NextFunction } from "express";

export const registerMiddleware = (req:Request,res:Response,next:NextFunction)=>{

        const {name,email,password,role} = req.body

        if(typeof name === "string" && typeof email === "string" && typeof password === "string" && (role ==="USER" || role ==="ADMIN")){

            const checkName:boolean = isValidName(name);
            const checkEmail:boolean = isValidEmail(email);
            const checkPassword:boolean = isValidPassword (password);
            const checkRole:boolean = isValidRole(role);

            

            if(checkName === false || checkEmail === false || checkPassword === false || checkRole === false){
                return res.status(400).json({
                    message:"Invalid User Details"
                })
            }
              next();
        }
        else{
            return res.status(400).json({
                message:"Invalid User Details"
            })
        }
}

export const loginMiddleware = (req:Request,res:Response,next:NextFunction)=>{

        const {email,password} = req.body;

        if(typeof email === "string" && typeof password === "string"){
            const checkEmail:boolean = isValidEmail(email);
            const checkPassword:boolean = password.length >0;

            if(checkEmail === false || checkPassword === false){
                 return res.status(400).json({
                    message:"Invalid User Details"
                })
            }
            next();
        }
        else{
             return res.status(400).json({
                    message:"Invalid User Details"
                })
        }
}

export const refreshMiddleware = (req:Request,res:Response,next:NextFunction)=>{
        
        const {refreshtoken} = req.body;

        if(typeof refreshtoken === "string" && refreshtoken.trim().length>0){
            next();
        }
         else{
             return res.status(400).json({
                    message:"Invalid User Details"
                })
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

function isValidRole(role:"USER" | "ADMIN"):boolean{
    
    if(role === "ADMIN" || role === "USER"){
        return true
    }
    return false;
}