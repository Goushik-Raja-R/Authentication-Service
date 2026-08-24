import {Pool} from "pg"; 
import {DATABASE_URL} from "./env.js";

const pool = new Pool({
    connectionString:DATABASE_URL,
    max:10,
    idleTimeoutMillis:30000,
    connectionTimeoutMillis:5000
})

export default pool;