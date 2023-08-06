class NotFoundError extends Error {
    constructor(message) {
        super(message || "Not found");
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

const errorTypes = [NotFoundError, QueueUnavailable];

module.exports = {
    NotFoundError,
    QueueUnavailable,
    errorTypes,
};
