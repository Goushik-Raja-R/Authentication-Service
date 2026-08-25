import app from './app.js'
import { testDatabaseConnection } from './utils/TestDatabaseConnection.js'
import { cleanupTask } from './jobs/refreshTokenCleanup.js';
import pool from './config/database.js';
import {PORT_NUMBER} from './config/env.js'
import type { Server } from 'node:http';
import { logger } from './utils/logger.js';
import { error } from 'node:console';

let cleanupInterval: NodeJS.Timeout | undefined;
let server:Server | undefined;
let isShuttingDown:boolean = false;

process.on("SIGTERM",async()=>{
        logger.info("SIGTERM RECEIVED"); 
        await gracefulShutdown();
        process.exit(0);
})

process.on("SIGINT",async()=>{
        logger.info("SIGINT RECEIVED"); 
        await gracefulShutdown();
        process.exit(0);
})

process.on("uncaughtException",async(error)=>{
        logger.error("UNCAUGHT EXCEPTION ",error); 
        await gracefulShutdown();
        process.exit(1);
})

process.on("unhandledRejection",async(error)=>{
        logger.error("UNHANDLED REJECTION ",error);
        await gracefulShutdown();
        process.exit(1);
})

ConnectionAndCleanup().catch((error)=>{
        logger.error("ERROR OCCURRED DURING CONNECTION OR CLEANUP",error);
        process.exit(1);
})

async function ConnectionAndCleanup() {
        await testDatabaseConnection();
        await cleanupTask();
        cleanupInterval = setInterval(cleanupTask, 60 * 60 * 1000);

        server = app.listen(PORT_NUMBER,()=>{
             logger.info(`Server Running on PORT: ${PORT_NUMBER}`)
        })
}

async function gracefulShutdown() {

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
            logger.error("ERROR OCCURED WHILE CLOSING THE SERVER: ",error)
        }

        if(cleanupInterval){
            clearInterval(cleanupInterval);
        }

        try{ await pool.end()}
        catch(error){logger.error("ERROR OCCURED WHILE CLOSING THE DB: ",error)}
}