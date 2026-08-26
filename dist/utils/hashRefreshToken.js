import crypto from 'node:crypto';
export const hashRefreshToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};
//# sourceMappingURL=hashRefreshToken.js.map