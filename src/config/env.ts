import dotenv from "dotenv";
import fs from "node:fs";

dotenv.config();

const PORT = process.env.PORT;

const JWT_SECRET =
    process.env.JWT_SECRET ??
    fs.readFileSync("/run/secrets/jwt_secret", "utf-8").trim();

const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET ??
    fs.readFileSync("/run/secrets/jwt_refresh_secret", "utf-8").trim();

const DATABASE_URL = process.env.DATABASE_URL;

const POSTGRES_PASSWORD =
    process.env.POSTGRES_PASSWORD ??
    fs.readFileSync("/run/secrets/postgres_password", "utf-8").trim();

if (!PORT) {
    console.error("PORT is missing.");
    process.exit(1);
}

if (!JWT_SECRET) {
    console.error("JWT_SECRET is missing.");
    process.exit(1);
}

if (!JWT_REFRESH_SECRET) {
    console.error("JWT_REFRESH_SECRET is missing.");
    process.exit(1);
}

if (!DATABASE_URL) {
    console.error("DATABASE_URL is missing.");
    process.exit(1);
}

if (!POSTGRES_PASSWORD) {
    console.error("POSTGRES_PASSWORD is missing.");
    process.exit(1);
}

const DATABASE_URL_STRING: string = DATABASE_URL;
const PORT_NUMBER = Number(PORT);
const JWT_SECRET_KEY:string = JWT_SECRET;
const JWT_REFRESH_KEY:string = JWT_REFRESH_SECRET

    if(typeof POSTGRES_PASSWORD !== 'string'){
        console.log("INVALID POSTGRES PASSWORD");
        process.exit(1);
    }

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


export {PORT_NUMBER,JWT_SECRET_KEY,JWT_REFRESH_KEY,DATABASE_URL_STRING,POSTGRES_PASSWORD};
