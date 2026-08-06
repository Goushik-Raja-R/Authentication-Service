import pool from "../config/database.js";

export const existingUser = async(email:string)=>{

        const result = await pool.query(
            "SELECT * FROM USERS WHERE email =$1",
            [email]
        )

        if(result){
            return result.rows[0];
        }else{
            throw new Error ("There is no User Found")
        }
}

export const createUser = async(newuser)=>{
    
}