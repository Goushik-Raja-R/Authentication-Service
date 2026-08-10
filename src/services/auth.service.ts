import bcrypt from 'bcrypt';
import type { User } from '../types/user.types.js';
import AppError from '../errors/AppError.js';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.js';

import { existingUser,createUser } from '../repositories/auth.repository.js';


export const ServiceResgister = async(user:User)=>{

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

        const result = await createUser(userWithHashedPassword);

        if(result){
            return result;
        }

        throw new AppError ("Error Occured while creation of user",500);

}

export const ServiceLogin = async(user:User)=>{

        const checkUser = await existingUser(user.email);

        if(checkUser === undefined){
            throw new AppError("Unauthorized User",401);
        }
        
        const passCheck = await bcrypt.compare(user.password,checkUser.password) 

        const options:SignOptions = {expiresIn:'15m'}

        if(passCheck){
            const token = jwt.sign(
                {userId:checkUser.id},
                JWT_SECRET_KEY,
                options
            );

            return token;

        }else{
            throw new AppError("Unauthorized User",403);
        }

}
