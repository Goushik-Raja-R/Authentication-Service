import bcrypt from 'bcrypt';
import type { User } from '../types/user.types.js';

import { existingUser,createUser } from '../repositories/auth.repository.js';


export const ServiceResgister = async(user:User)=>{

        const checkExistingUser = await existingUser(user.email);

        if(checkExistingUser){
            throw new Error("User Already Exists");
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

        throw new Error ("Error Occured while creation of user");

}

