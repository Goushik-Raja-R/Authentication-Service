
import { deleteExpiredRefreshTokens } from "../repositories/auth.repository.js";

async function cleanupTask() {
    try{
        await deleteExpiredRefreshTokens();
        console.log("Cleanup Done");
    }
    catch(error){
        console.log(error);
    }
}

export {cleanupTask}