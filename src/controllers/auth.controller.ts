import type {Request,Response} from 'express';
import { ServiceResgister,ServiceLogin,ServiceProfile,ServiceDelete,ServiceRefresh,ServiceLogout,ServiceLogoutAll} from '../services/auth.service.js';


export const register = async (req:Request,res:Response) =>{
            const user = req.body;
            const result = await ServiceResgister(user);

                return res.status(201).json({
                    message:"User Created Successfully",
                    data:result
                })
}

export const login = async(req:Request,res:Response) =>{
            const user = req.body;
            const result = await ServiceLogin(user)

            return res.status(200).json({
                message:"User Successfully logged in",
                data:result
            })
}

export const profile = async(req:Request,res:Response)=>{

            if(req.user === undefined){
                return res.status(401).json({
                    message:"Unauthorized user"
                })
            }
            const user = await ServiceProfile(req.user);

            return res.status(200).json({
                message:"User Data",
                data:user
            })
}

export const deleteUser = async(req:Request,res:Response)=>{

            if(typeof(req.params.id) !== "string"){
                 return res.status(400).json({
                    message:"Invalid user id",
                  })
            }
            
            const userID = parseInt(req.params.id,10);

            if(isNaN(userID)){
                return res.status(400).json({
                message:"Invalid user id",
            })
            }

            await ServiceDelete(userID);

            return res.status(200).json({
                message:"User Deleted Successfullyy"
            })

}

export const refresh = async(req:Request,res:Response)=>{

        const {refreshtoken} = req.body;

        const token = await ServiceRefresh(refreshtoken);

        return res.status(200).json({
            message:"Accesstoken created successfully",
            accesstoken:token
        })

}

export const logout = async(req:Request,res:Response)=>{

        const {refreshtoken} = req.body;
        await ServiceLogout(refreshtoken)

        return res.status(200).json({
            message:"User Logout successfully",
        })
}

export const logoutAll = async(req:Request,res:Response)=>{

        const {refreshtoken} = req.body;
        await ServiceLogoutAll(refreshtoken)

        return res.status(200).json({
            message:"User Logout successfully & revoked all",
        })
}

 

// if the user return the value line 11 will get executed 

// or if the user throws user already exist it will go to catch block which is in line 18 and check if the serice sended error is instance of app error or not if yes it will execute Apperror return status and message

// both the condotion is not worked then it is not a businness logic it is a internal server error so the it will execute the catch block else condition which is in line 23