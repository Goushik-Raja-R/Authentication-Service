import {Pool} from "pg"; 
import { DB_HOST,DB_NAME,DB_USER,DB_PORT_NUMBER,DB_PASSWORD } from "./env.js";


const pool = new Pool({
    port:DB_PORT_NUMBER,
    host:DB_HOST,
    database:DB_NAME,
    user:DB_USER,
    password:DB_PASSWORD
});

export default pool;