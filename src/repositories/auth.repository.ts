import pool from "../config/database.js";
import type { RegisterUser,RefreshTokenUser } from "../types/user.types.js";

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

export const refreshUser = async(user:RefreshTokenUser)=>{
    
        await pool.query(
        `INSERT INTO refresh_tokens(user_id,token,expires_at) VALUES($1,$2,$3)`,
        [user.user_id,user.token,user.expires_at]
    )
}

export const userDataFromRefresh = async(token:string)=>{

        const result = await pool.query(
            `SELECT *FROM refresh_tokens WHERE token = $1`,
            [token]
        )

        return result.rows[0];
}

export const revocationToken = async(token:string)=>{

        await pool.query(
            `UPDATE refresh_tokens
             SET revoked = TRUE
             WHERE token = $1 `,
             [token]
        )
}

export const revocationTokenAll = async(user_id:number)=>{

        await pool.query(
            `UPDATE refresh_tokens
            SET revoked = TRUE
            where user_id = $1 AND revoked = FALSE`,
            [user_id]
        )
}

export const deleteExpiredRefreshTokens = async()=>{
        await pool.query(
            `DELETE FROM refresh_token
            WHERE expires_at < NOW() `
        )
}