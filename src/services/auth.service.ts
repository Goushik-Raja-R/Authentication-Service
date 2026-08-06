import express from 'express';
import bcrypt from 'bcrypt';

import { existingUser } from '../repositories/auth.repository.js';


export const ServiceResgister = async(user)=>{

        const CheckExistingUser = await existingUser(user.email);

        if(CheckExistingUser){
            throw new Error("User Already Exists");
        }

        const hashpassword = await bcrypt.hash(user.password,10);

        const newuser =({
            name:user.name,
            email:user.email,
            password:hashpassword
        })

        createUser(newuser);

}

