const authService = require("../service/auth.service"),
    { ResourceNotFoundError, BadRequestError, ForbiddenError } = require("../util/api-error.util")

exports.activateUser = async (req, res, next) => {

    let activationCode = req.params.activationCode

    try {
        let updatedUser = await authService.activateUser(activationCode)
        res.status(200).json(updatedUser)
    }
    catch (error) {
        next(error)
    }
}

exports.signIn = async (req, res, next) => {

    let email = req.body.email
    let password = req.body.password

    try {

        if (!email && !password)
            throw new BadRequestError("Both username and password is required !")

        let resp = await authService.signIn(email, password)
        res.status(200).json(resp)
    }
    catch (error) {
        next(error)
    }
}

exports.getRole = async (req, res, next) => {

    let email = req.params.email

    try {

        let role = await authService.getRole(email)
        res.status(200).json(role)
    }
    catch (error) {
        next(error)
    }
}
