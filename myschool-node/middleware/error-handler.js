const { BadRequestError, InternalServerError, ResourceNotFoundError, ForbiddenError, ConflictError } = require("../util/api-error.util")

exports.handleError = (app) => {

    app.use((error, req, res, next) => {

        let status
        let errorName = error.name
        let resp = error.message

        if (errorName === ResourceNotFoundError.name)
            status = 404

        else if (errorName === BadRequestError.name)
            status = 400

        else if (errorName === ForbiddenError.name)
            status = 403

        else if (errorName === InternalServerError.name) {
            status = 500
        }

        else if (errorName === ConflictError.name) {
            status = 409
        }

        else {
            status = 500
        }

        res.status(status).json(resp)
    })

    return app
}