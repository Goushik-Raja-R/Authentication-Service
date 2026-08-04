import pool from "../config/database.js";

async function testDatabaseConnection() {
    try{

        const result = await pool.query("SELECT NOW()")

        console.log("✅ PostgreSQL Connected Successfully");
        console.log(result.rows[0]);
    }catch(error)
    {
        console.log(`Database connection failed `,error);
        process.exit(1);
    }
}

export {testDatabaseConnection};