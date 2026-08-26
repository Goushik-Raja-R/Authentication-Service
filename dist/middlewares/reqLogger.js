import { logger } from "../utils/logger.js";
import crypto from 'node:crypto';
export const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    res.on("finish", () => {
        const endTime = Date.now();
        const url = req.url;
        const method = req.method;
        const statusCode = res.statusCode;
        const duration = endTime - startTime;
        logger.info(`${req.reqId} ${method} ${url}/ ${statusCode} ${duration}ms`);
    });
    next();
};
export const generateRequestID = (req, res, next) => {
    req.reqId = crypto.randomUUID();
    next();
};
//# sourceMappingURL=reqLogger.js.map