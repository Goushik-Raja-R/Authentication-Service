import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;

if(!PORT){
     console.error("PORT environment variable is missing.");
     process.exit(1);
}

const PORT_NUMBER = parseInt(PORT,10);

if(isNaN(PORT_NUMBER)){
    console.error("Invalid PORT value.");
    process.exit(1);
}

export default PORT_NUMBER