import app from './app.js'
import { testDatabaseConnection } from './utils/TestDatabaseConnection.js'
import { cleanupTask } from './jobs/refreshTokenCleanup.js';

import {PORT} from './config/env.js'

ConnectionAndCleanup();

async function ConnectionAndCleanup() {
        await testDatabaseConnection();
        cleanupTask();
        setInterval(cleanupTask, 60 * 60 * 1000);

        app.listen(PORT,()=>{
             console.log(`Server Running on PORT: ${PORT}`)
        })

}



