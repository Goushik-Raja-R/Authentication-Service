import bcrypt from 'bcrypt';
import type { LoginUser,RegisterUser } from '../types/user.types.js';
import AppError from '../errors/AppError.js';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { JWT_SECRET_KEY,JWT_REFRESH_KEY } from '../config/env.js';
import type { AuthUser,RefreshTokenPayload } from '../types/auth.types.js';

import { existingUser,createUser,getUserProfile,userDeletion } from '../repositories/auth.repository.js';


export const ServiceResgister = async(user:RegisterUser)=>{

        const checkExistingUser = await existingUser(user.email);

        if(checkExistingUser){
            throw new AppError("User Already Exist",409);
        }

        const hashedpassword = await bcrypt.hash(user.password,10);

        const userWithHashedPassword =({
            name:user.name,
            email:user.email,
            password:hashedpassword,
            role:user.role
        })

        const result = await createUser(userWithHashedPassword);

        if(result){
            return result;
        }

        throw new AppError ("Error Occured while creation of user",500);

}

export const ServiceLogin = async(user:LoginUser)=>{

        const checkUser = await existingUser(user.email);

        if(checkUser === undefined){
            throw new AppError("Unauthorized User",401);
        }
        
        const passCheck = await bcrypt.compare(user.password,checkUser.password) 

        const options:SignOptions = {expiresIn:'15m'}
        const refOption:SignOptions = {expiresIn:'7d'}

        if(passCheck){
            const accesstoken = jwt.sign(
                {userId:checkUser.id,
                role:checkUser.role},
                JWT_SECRET_KEY,
                options
            );

            const refreshtoken = jwt.sign(
                {userId:checkUser.id},
                JWT_REFRESH_KEY,
                refOption
            )

            return {accesstoken,refreshtoken};

        }else{
            throw new AppError("Unauthorized User",401);
        }

}

export const ServiceProfile = async(user:AuthUser)=>{

        const userId = user.userId

        const userDetails = await getUserProfile(userId);

        if(userDetails === undefined){
            throw new AppError("Unauthorized user",401)
        }

        return userDetails;

}

export const ServiceDelete = async(userID:number)=>{

        const user = await userDeletion(userID);

        if(user === 0){
            throw new AppError("User Not found",404)
        }

        return user;

}

export const ServiceRefresh = async(token:string)=>{

 
        try{
            const checkToken = jwt.verify(token,JWT_REFRESH_KEY) as RefreshTokenPayload

        if(!checkToken.userId){
            throw new AppError("Unauthorized",401);
        }

        const user = await getUserProfile(checkToken.userId)

        if(!user){
            throw new AppError("Unauthorized",401);
        }

        const newAccessOption:SignOptions = {expiresIn:'15m'}

        const newAccessToken = jwt.sign({
                userId:checkToken.userId,
                role:user.role},
                JWT_SECRET_KEY,
                newAccessOption
        )
            
        return newAccessToken
    }
    catch(error){
        throw new AppError("Internal Server Error",500)
    }
}