import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

if(!PORT || !DB_HOST || !DB_PORT  || !DB_NAME  || !DB_USER  || !DB_PASSWORD ){
     console.error("One or more required environment variables are missing.");
     process.exit(1);
}

const PORT_NUMBER = parseInt(PORT,10);
const DB_PORT_NUMBER = parseInt(DB_PORT,10);

if(isNaN(PORT_NUMBER) || isNaN(DB_PORT_NUMBER)){
    console.error("Invalid PORT value.");
    process.exit(1);
}

export {PORT,DB_HOST,DB_PORT_NUMBER,DB_NAME,DB_USER,DB_PASSWORD};