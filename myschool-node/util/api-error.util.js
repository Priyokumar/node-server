
class APIError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

class ResourceNotFoundError extends APIError {
    constructor(message) {
        super(message)
    }
}

class ForbiddenError extends APIError {
    constructor(message) {
        super(message)
    }
}

class BadRequestError extends APIError {
    constructor(message) {
        super(message)
    }
}

class ConflictError extends APIError {
    constructor(message) {
        super(message)
    }
}

class InternalServerError extends APIError {
    constructor(error) {
        super(error.message)
        this.data = { error }
    }
}

module.exports = {
    ResourceNotFoundError,
    InternalServerError,
    BadRequestError,
    ForbiddenError,
    ConflictError
};