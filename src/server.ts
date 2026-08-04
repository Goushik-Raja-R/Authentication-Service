import app from './app.js'
import { testDatabaseConnection } from './utils/TestDatabaseConnection.js'

import {PORT} from './config/env.js'

testDatabaseConnection();

app.listen(PORT,()=>{
    console.log(`Server Running on PORT: ${PORT}`)
})

