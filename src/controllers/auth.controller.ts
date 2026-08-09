import type {Request,Response} from 'express';

import { ServiceResgister,ServiceLogin } from '../services/auth.service.js';

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

// if the user return the value line 11 will get executed 

// or if the user throws user already exist it will go to catch block which is in line 18 and check if the serice sended error is instance of app error or not if yes it will execute Apperror return status and message

// both the condotion is not worked then it is not a businness logic it is a internal server error so the it will execute the catch block else condition which is in line 23