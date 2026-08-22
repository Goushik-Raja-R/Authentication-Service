import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;


if(!PORT || !DB_HOST || !DB_PORT  || !DB_NAME  || !DB_USER  || !DB_PASSWORD || !JWT_SECRET || !JWT_REFRESH_SECRET){
     console.error("One or more required environment variables are missing.");
     process.exit(1);
}


const PORT_NUMBER = Number(PORT);
const DB_PORT_NUMBER = Number(DB_PORT);
const JWT_SECRET_KEY:string = JWT_SECRET;
const JWT_REFRESH_KEY:string = JWT_REFRESH_SECRET

    if(!Number.isInteger(PORT_NUMBER) || !Number.isInteger(DB_PORT_NUMBER)){
        console.log("INVALID PORT or DB PORT VALUE");
        process.exit(1);
    }

    if(PORT_NUMBER < 1 || PORT_NUMBER > 65535 || DB_PORT_NUMBER < 1 || DB_PORT_NUMBER > 65535){
        console.log("INVALID PORT or DB PORT VALUE");
        process.exit(1);
    }


export {PORT_NUMBER,DB_HOST,DB_PORT_NUMBER,DB_NAME,DB_USER,DB_PASSWORD,JWT_SECRET_KEY,JWT_REFRESH_KEY};