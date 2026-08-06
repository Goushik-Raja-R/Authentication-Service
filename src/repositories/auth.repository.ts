import pool from "../config/database.js";
import type { User } from "../types/user.types.js";

export const existingUser = async(email:string)=>{

        const result = await pool.query(
            `SELECT * FROM USERS WHERE email =$1`,
            [email]
        )
            return result.rows[0];
}

export const createUser = async(newuser:User)=>{


    const result = await pool.query(
        `INSERT INTO USERS(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email`,
        [newuser.name,newuser.email,newuser.password]
    )

        return result.rows[0];
}