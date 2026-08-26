export const authorize = (roles) => {
    return (req, res, next) => {
        if (req.user === undefined) {
            return res.status(401).json({
                message: "Unauthorized user"
            });
        }
        if (req.user.role !== roles) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }
        next();
    };
};
//# sourceMappingURL=roles.middleware.js.map