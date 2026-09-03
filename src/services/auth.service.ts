import bcrypt from 'bcrypt';
import type { LoginUser,RegisterUser } from '../types/user.types.js';
import AppError from '../errors/AppError.js';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { JWT_SECRET_KEY,JWT_REFRESH_KEY } from '../config/env.js';
import type { AuthUser,RefreshTokenPayload } from '../types/auth.types.js';

import { existingUser,createUser,getUserProfile,
    userDeletion,refreshUser,userDataFromRefresh,revocationToken,revocationTokenAll } from '../repositories/auth.repository.js';



export const ServiceResgister = async(user:RegisterUser)=>{

        const checkExistingUser = await existingUser(user.email);

        if(checkExistingUser){
            throw new AppError("User Already Exist",409);
        }

        const hashedpassword = await bcrypt.hash(user.password,10);

        const userWithHashedPassword =({
            name:user.name,
            email:user.email,
            password:hashedpassword
        })

        try{
            const result = await createUser(userWithHashedPassword);
            return result;

        }catch(error){
            if(typeof error === "object" && error !== null){
                if("code" in error && "constraint" in error && error.code === "23505" && error.constraint ==="users_email_key"){
                    throw new AppError("Email is already registered",409)
                }
            }
              throw new AppError ("Internal Server Error",500);
        }

}

export const ServiceLogin = async(user:LoginUser)=>{

        const checkUser = await existingUser(user.email);

        if(checkUser === undefined){
            throw new AppError("Unauthorized User",401);
        }
        
        const passCheck = await bcrypt.compare(user.password,checkUser.password) 

        const AccOptions:SignOptions = {expiresIn:'15m',algorithm:'HS256'}
        const refOption:SignOptions = {expiresIn:'7d',algorithm:'HS256'}

        if(passCheck){
            const accesstoken = jwt.sign(
                {userId:checkUser.id,
                role:checkUser.role},
                JWT_SECRET_KEY,
                AccOptions
            );

            const refreshtoken = jwt.sign(
                {userId:checkUser.id},
                JWT_REFRESH_KEY,
                refOption
            )

            const expireTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

            const user =({
                user_id:checkUser.id,
                token:refreshtoken,
                expires_at:expireTime
            })

            await refreshUser(user);

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
            const checkToken = jwt.verify(token,JWT_REFRESH_KEY,{algorithms:['HS256']}) as RefreshTokenPayload

        if(!checkToken.userId){
            throw new AppError("Unauthorized",401);
        }

        const UserData = await revocationToken(token);

        if(!UserData){
            throw new AppError("Unauthorized",401)
        }

        const newRefreshOption:SignOptions = {expiresIn:'7d',algorithm:'HS256'}
        const newAccessOption:SignOptions = {expiresIn:'15m',algorithm:'HS256'}

        const newAccessToken = jwt.sign({
                userId:UserData.user_id,
                role:UserData.role},
                JWT_SECRET_KEY,
                newAccessOption
        )

        const newRefreshToken = jwt.sign({
            userId:UserData.user_id},
            JWT_REFRESH_KEY,
            newRefreshOption
        )

        const expireTime:Date = new Date(Date.now()+ 7 * 24 * 60 * 60 * 1000)

        const newRefToken =({
            user_id:UserData.user_id,
            token:newRefreshToken,
            expires_at:expireTime
        })

        await refreshUser(newRefToken);

        return {newAccessToken,newRefreshToken}
    }
    catch(error){
        
        if(error instanceof AppError){
            throw error
        }
        throw new AppError("Unauthorized",401);
    }
}

export const ServiceLogout = async(token:string)=>{
        
        try{
            const checkToken = jwt.verify(token,JWT_REFRESH_KEY,{algorithms:['HS256']}) as RefreshTokenPayload

            if(!checkToken.userId){
                throw new AppError("Unauthorized User",401);
            }

            const user = await userDataFromRefresh(token);

            if(!user || user.revoked === true){
                throw new AppError("Unauthorized",401);
            }

            await revocationToken(token);
        }
        catch(error){
            if(error instanceof AppError){
                throw error
            }
             throw new AppError("Unauthorized",401);
        }

}

export const ServiceLogoutAll = async(token:string)=>{

    try{

        const checkToken = jwt.verify(token,JWT_REFRESH_KEY,{algorithms:['HS256']}) as RefreshTokenPayload

        if(!checkToken.userId){
            throw new AppError("Unauthorized User",401);
        }

        const user = await userDataFromRefresh(token);

        if(!user || user.revoked === true){
            throw new AppError("Unauthorized",401);
        }

         await revocationTokenAll(checkToken.userId);
    }
    catch(error){
        if(error instanceof AppError){
            throw error
        }
        throw new AppError("Unauthorized",401);
    }
}