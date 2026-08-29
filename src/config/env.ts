import dotenv from 'dotenv'
dotenv.config();
import fs from "node:fs"

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET?? fs.readFileSync("/run/secrets/jwt_secret","utf-8").trim();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const DATABASE_URL = process.env.DATABASE_URL


if(!PORT || !JWT_SECRET || !JWT_REFRESH_SECRET || !DATABASE_URL){
     console.error("One or more required environment variables are missing.");
     process.exit(1);
}


const PORT_NUMBER = Number(PORT);
const JWT_SECRET_KEY:string = JWT_SECRET;
const JWT_REFRESH_KEY:string = JWT_REFRESH_SECRET

    if(!Number.isInteger(PORT_NUMBER)){
        console.log("INVALID PORT NUMBER");
        process.exit(1);
    }

    if(JWT_SECRET_KEY.length < 32 || JWT_REFRESH_KEY.length < 32){
        console.error("JWT SECRETS MUST BE ATLEAST 32 CHARACTERS LONG.");
        process.exit(1);
    }

    if(PORT_NUMBER < 1 || PORT_NUMBER > 65535){
        console.log("INVALID PORT NUMBER");
        process.exit(1);
    }


export {PORT_NUMBER,JWT_SECRET_KEY,JWT_REFRESH_KEY,DATABASE_URL};