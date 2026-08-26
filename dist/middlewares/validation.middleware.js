import AppError from "../errors/AppError.js";
export const registerMiddleware = (req, res, next) => {
    const allowedFields = ['name', 'email', 'password'];
    if (typeof req.body !== 'object' || req.body === null || Array.isArray(req.body)) {
        throw new AppError("Invalid User Details", 400);
    }
    if (allowedFields.length !== Object.keys(req.body).length) {
        throw new AppError("Invalid User Details", 400);
    }
    const isValidFields = Object.keys(req.body).every((key) => {
        return allowedFields.includes(key);
    });
    if (isValidFields === false) {
        throw new AppError("Invalid User Details", 400);
    }
    const { name, email, password } = req.body;
    if (typeof name === "string" && typeof email === "string" && typeof password === "string") {
        const checkName = isValidName(name);
        const checkEmail = isValidEmail(email);
        const checkPassword = isValidPassword(password);
        if (checkName === false) {
            throw new AppError("Invalid Name", 400);
        }
        if (checkEmail === false) {
            throw new AppError("Invalid Email", 400);
        }
        if (checkPassword === false) {
            throw new AppError("Invalid Password", 400);
        }
        next();
    }
    else {
        throw new AppError("Invalid User Details", 400);
    }
};
export const loginMiddleware = (req, res, next) => {
    const allowedfields = ['email', 'password'];
    if (typeof req.body !== 'object' || req.body === null || Array.isArray(req.body)) {
        throw new AppError("Invalid login Credentials", 400);
    }
    if (allowedfields.length !== Object.keys(req.body).length) {
        throw new AppError("Invalid login Credentials", 400);
    }
    const isValidFields = Object.keys(req.body).every((key) => {
        return allowedfields.includes(key);
    });
    if (isValidFields === false) {
        throw new AppError("Invalid login Credentials", 400);
    }
    const { email, password } = req.body;
    if (typeof email === "string" && typeof password === "string") {
        const checkEmail = isValidEmail(email);
        const checkPassword = password.length > 0;
        if (checkEmail === false) {
            throw new AppError("Invalid email", 400);
        }
        if (checkPassword === false) {
            throw new AppError("Invalid Password", 400);
        }
        next();
    }
    else {
        throw new AppError("Invalid Login Details", 400);
    }
};
export const refreshMiddleware = (req, res, next) => {
    const allowedFields = ['refreshtoken'];
    if (req.body === null) {
        throw new AppError("Invalid Token", 400);
    }
    if (Object.keys(req.body).length !== allowedFields.length) {
        throw new AppError("Invalid Token", 400);
    }
    const isvalidFields = Object.keys(req.body).every((key) => {
        return allowedFields.includes(key);
    });
    if (isvalidFields === false) {
        throw new AppError("Invalid Token", 400);
    }
    const { refreshtoken } = req.body;
    if (typeof refreshtoken === "string" && refreshtoken.trim().length > 0) {
        next();
    }
    else {
        throw new AppError("Invalid Token", 400);
    }
};
function isValidName(name) {
    const trimmed = name.trim();
    const nameRegex = /^[A-Za-z ]+$/;
    return (trimmed.length >= 2 && trimmed.length <= 50 && nameRegex.test(trimmed));
}
function isValidEmail(email) {
    if (!email || email.length > 254) {
        return false;
    }
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailregex.test(email);
}
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    return passwordRegex.test(password);
}
//# sourceMappingURL=validation.middleware.js.map