import AppError from "../errors/AppError.js";
import { logger } from "../utils/logger.js";
export const errorHandler = (error, req, res, next) => {
    if (typeof error === 'object' && error !== null && 'type' in error && error.type === "entity.too.large") {
        logger.warn(`${req.reqId} ${req.method} ${req.url} Request body too large`);
        return res.status(413).json({
            message: "Payload Too Large"
        });
    }
    if (error instanceof AppError) {
        logger.warn(`${req.reqId} ${req.method} ${req.url} ${error.message} ${error.statusCode}`);
        return res.status(error.statusCode).json({
            message: error.message
        });
    }
    else {
        logger.error(`${req.reqId} ${req.method} ${req.url}`, error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
//# sourceMappingURL=error.middleware.js.map