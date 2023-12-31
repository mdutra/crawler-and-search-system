const { validationResult } = require("express-validator");
const { errorTypes, NotFoundError, ValidationError } = require("../error");

function catchAll(_req, _res, _next) {
    throw new NotFoundError('Route not found');
}

function handleError(err, _req, res, _next) {
    for (const errorType of errorTypes) {
        if (err instanceof errorType) {
            return res.status(err.statusCode).json({ error: err.message });
        }
    }

    console.error(`${err.name}: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
}

function checkValidation(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array().map(e => e.msg));
    }

    next();
}

module.exports = {
    catchAll,
    handleError,
    checkValidation,
};
