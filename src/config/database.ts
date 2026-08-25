import {Pool} from "pg"; 
import {DATABASE_URL} from "./env.js";
import { logger } from "../utils/logger.js";

    const pool = new Pool({
        connectionString:DATABASE_URL,
        max:10,
        idleTimeoutMillis:30000,
        connectionTimeoutMillis:5000
    })

    pool.on("error",(error)=>{
        logger.error("UNEXPECTED DATABASE POOL ERROR",error);
    })

export default pool;