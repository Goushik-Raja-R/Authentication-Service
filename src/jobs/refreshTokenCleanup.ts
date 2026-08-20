
import { deleteExpiredRefreshTokens } from "../repositories/auth.repository.js";

async function cleanupTask() {
    try{
        await deleteExpiredRefreshTokens();
    }
    catch(error){
        console.log(error);
    }
}

export {cleanupTask}