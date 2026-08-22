import app from './app.js'
import { testDatabaseConnection } from './utils/TestDatabaseConnection.js'
import { cleanupTask } from './jobs/refreshTokenCleanup.js';
import pool from './config/database.js';
import {PORT_NUMBER} from './config/env.js'
import type { Server } from 'node:http';

let Interval: NodeJS.Timeout | undefined;
let server:Server | undefined;
let isShuttingDown:boolean = false;

process.on("uncaughtException",(error)=>{
        console.error("UNCAUGHT EXCEPTION: ",error); 
        graceFulShutdown();
})

process.on("unhandledRejection",(error)=>{
        console.error("UNHANDLED REJECTION: ",error);
        graceFulShutdown();
})

ConnectionAndCleanup();

async function ConnectionAndCleanup() {
        await testDatabaseConnection();
        await cleanupTask();
        Interval = setInterval(cleanupTask, 60 * 60 * 1000);

        server = app.listen(PORT_NUMBER,()=>{
             console.log(`Server Running on PORT: ${PORT_NUMBER}`)
        })
}

async function graceFulShutdown() {

        if(isShuttingDown){
            return;
        }

        isShuttingDown = true

        try{
        if(server){
          const currentServer = server
          await new Promise<void>((resolve,reject)=>{
            currentServer.close((error)=>{
               if(error){
                 reject(error)}
                else{
                 resolve();}
                })
              })
        }
        }
        catch(error){
            console.log("ERROR OCCURED WHILE CLOSING THE SERVER: ",error)
        }

        if(Interval){
            clearInterval(Interval);
        }

        try{ await pool.end()}
        catch(error){console.log("ERROR OCCURED WHILE CLOSING THE DB: ",error)}
        process.exit(1);
}
