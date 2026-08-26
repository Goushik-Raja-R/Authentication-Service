import AppError from "../errors/AppError.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.js";
export const authMiddleware = (req, res, next) => {
    let checkToken;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError("Unauthorized", 401);
    }
    const token = authHeader.trim().split(" ");
    if (token.length === 2 && token[0] === "Bearer") {
        checkToken = token[1];
    }
    else {
        throw new AppError("Unauthorized", 401);
    }
    try {
        const result = jwt.verify(checkToken, JWT_SECRET_KEY, { algorithms: ['HS256'] });
        if (result.userId === null || typeof result.userId !== 'number' || (result.role !== "USER" && result.role !== "ADMIN")) {
            throw new AppError("Unauthorized", 401);
        }
        if (!Number.isInteger(result.userId) || result.userId <= 0) {
            throw new AppError("Unauthorized", 401);
        }
        req.user = result;
        next();
    }
    catch (error) {
        throw new AppError("Unauthorized", 401);
    }
};
export const authorizeDeleteUser = (req, res, next) => {
    if (req.user?.role === "ADMIN") {
        return next();
    }
    else {
        if (req.user?.role === "USER") {
            const userId = Number(req.params.id);
            if (isNaN(userId)) {
                throw new AppError("Invalid User ID", 400);
            }
            if (req.user.userId === userId) {
                return next();
            }
        }
    }
    throw new AppError("Forbidden", 403);
};
//# sourceMappingURL=auth.middleware.js.map