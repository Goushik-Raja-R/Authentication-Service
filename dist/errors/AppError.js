class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
export default AppError;
//# sourceMappingURL=AppError.js.map