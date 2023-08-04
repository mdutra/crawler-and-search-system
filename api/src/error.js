class RouteNotFoundError extends Error {
    constructor(message) {
        super(message || "Route not found");
        this.statusCode = 404;
        this.message;
    }
}

class QueueUnavailable extends Error {
    constructor(message) {
        super(message || "Queue Unavailable");
        this.statusCode = 502;
        this.message;
    }
}

const errorTypes = [RouteNotFoundError, QueueUnavailable];

module.exports = {
    RouteNotFoundError,
    QueueUnavailable,
    errorTypes,
};
