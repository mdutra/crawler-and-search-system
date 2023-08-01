class RouteNotFoundError extends Error {
    constructor(message) {
        super(message || "Route not found");
        this.statusCode = 404;
        this.message;
    }
}

const errorTypes = [RouteNotFoundError];

module.exports = {
    RouteNotFoundError,
    errorTypes,
};
