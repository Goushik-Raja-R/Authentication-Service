import express from 'express';
import {Request,Response} from 'express';
import ServiceResgister from '../services/auth.service.js'

export const register = async (req:Request,res:Response) =>{
      try{
            const user = req.body;
            const result = await ServiceResgister(user);

            if(result){
                return res.status(200).json({
                    message:"User Created Successfully",
                    data:result.data
                })
            }else{
                return res.status(400).json({
                    message:"User Creation failed"
                })
            }
      }
      catch(error){
            return res.status(500).json({
                message:"Internal Server Error"
            })
      }
}