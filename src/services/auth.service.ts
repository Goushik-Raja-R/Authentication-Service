import bcrypt from 'bcrypt';
import type { LoginUser,RegisterUser } from '../types/user.types.js';
import AppError from '../errors/AppError.js';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.js';
import type { AuthUser } from '../types/auth.types.js';

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

        if(passCheck){
            const token = jwt.sign(
                {userId:checkUser.id,
                role:checkUser.role},
                JWT_SECRET_KEY,
                options
            );

            return token;

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