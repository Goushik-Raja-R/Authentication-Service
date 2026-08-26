import rateLimit from "express-rate-limit";
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
});
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10
});
export const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20
});
export const registerLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10
});
//# sourceMappingURL=rateLimit.middleware.js.map