import pool from "../config/database.js";
import type { RegisterUser } from "../types/user.types.js";

export const existingUser = async(email:string)=>{

        const result = await pool.query(
            `SELECT * FROM USERS WHERE email =$1`,
            [email]
        )
            return result.rows[0];
}

export const createUser = async(newuser:RegisterUser)=>{


    const result = await pool.query(
        `INSERT INTO USERS(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING id,name,email,role`,
        [newuser.name,newuser.email,newuser.password,newuser.role]
    )

        return result.rows[0];
}

export const getUserProfile = async(userID:number)=>{

    const result = await pool.query(
        `SELECT ID,NAME,EMAIL,ROLE FROM USERS WHERE ID =$1`,
        [userID]
    )

    return result.rows[0];
}

export const userDeletion = async(userID:number)=>{
    
    const result = await pool.query(
        `DELETE FROM USERS WHERE ID = $1`,
        [userID]
    )

    return result.rowCount;
}