export const logger = {
    info: (message) => {
        console.log(`[INFO] ${message}`);
    },
    warn: (message) => {
        console.warn(`[WARN] ${message}`);
    },
    error: (message, error) => {
        console.error(`[ERROR] ${message}`, error);
    }
};
//# sourceMappingURL=logger.js.map