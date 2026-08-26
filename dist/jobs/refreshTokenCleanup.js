import { deleteExpiredRefreshTokens } from "../repositories/auth.repository.js";
import { logger } from "../utils/logger.js";
async function cleanupTask() {
    try {
        await deleteExpiredRefreshTokens();
        logger.info("Cleanup Done");
    }
    catch (error) {
        logger.error("ERROR OCCURRED WHILE CLEANING UP", error);
    }
}
export { cleanupTask };
//# sourceMappingURL=refreshTokenCleanup.js.map