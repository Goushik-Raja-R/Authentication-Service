import {Pool} from "pg"; 
import {DATABASE_URL_STRING,POSTGRES_PASSWORD} from "./env.js";
import { logger } from "../utils/logger.js";


const connectionString =
    DATABASE_URL_STRING.replace(
        "postgresql://postgres@",
        `postgresql://postgres:${encodeURIComponent(POSTGRES_PASSWORD)}@`
    );

    const pool = new Pool({
        connectionString,
        max:10,
        idleTimeoutMillis:30000,
        connectionTimeoutMillis:5000
    })

    pool.on("error",(error)=>{
        logger.error("UNEXPECTED DATABASE POOL ERROR",error);
    })

export default pool;