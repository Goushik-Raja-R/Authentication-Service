import app from './app.js'
import { testDatabaseConnection } from './utils/TestDatabaseConnection.js'
import { cleanupTask } from './jobs/refreshTokenCleanup.js';

import {PORT} from './config/env.js'

ConnectionAndCleanup();

async function ConnectionAndCleanup() {
        await testDatabaseConnection();
        await cleanupTask();
        setInterval(cleanupTask, 60 * 60 * 1000);

        app.listen(PORT,()=>{
             console.log(`Server Running on PORT: ${PORT}`)
        })

}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ1LCJpYXQiOjE3ODcyODkyNzEsImV4cCI6MTc4Nzg5NDA3MX0.AoFFGgsnUY-360mvjkpJfyPGmXzT29X_1JSWA6VKTNY

