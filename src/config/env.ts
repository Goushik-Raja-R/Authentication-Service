import dotenv from "dotenv";
import fs from "node:fs";

dotenv.config();

const PORT = process.env.PORT;

function readSecret(envName: string,secretName: string):string{
    const envValue = process.env[envName]

    if(envValue){
        return envValue;
    }

    const secretPath = `/run/secrets/${secretName}`;

    if(fs.existsSync(secretPath)){
        return fs.readFileSync(secretPath,"utf-8").trim();
    }

    return "";
}

const JWT_SECRET_KEY = readSecret("JWT_SECRET","jwt_secret");

const JWT_REFRESH_KEY = readSecret("JWT_REFRESH_SECRET","jwt_refresh_secret");

const DATABASE_URL = process.env.DATABASE_URL;

const POSTGRES_PASSWORD = readSecret("POSTGRES_PASSWORD","postgres_password");

if (!PORT) {
    console.error("PORT is missing.");
    process.exit(1);
}

if (!JWT_SECRET_KEY) {
    console.error("JWT_SECRET is missing.");
    process.exit(1);
}

if (!JWT_REFRESH_KEY) {
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

    if (!Number.isInteger(PORT_NUMBER)){
        console.log("INVALID PORT NUMBER");
        process.exit(1);
    }

    if(JWT_SECRET_KEY.length < 32 || JWT_REFRESH_KEY.length < 32){
        console.error("JWT SECRETS MUST BE AT LEAST 32 CHARACTERS LONG.");
        process.exit(1);
    }

    if(PORT_NUMBER < 1 || PORT_NUMBER > 65535){
        console.log("INVALID PORT NUMBER");
        process.exit(1);
    }


export {PORT_NUMBER,JWT_SECRET_KEY,JWT_REFRESH_KEY,DATABASE_URL_STRING,POSTGRES_PASSWORD};
