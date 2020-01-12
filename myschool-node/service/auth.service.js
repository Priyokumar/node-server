const UserModel = require("../model/mongoose/user.model")
const { ResourceNotFoundError, BadRequestError, ForbiddenError } = require("../util/api-error.util")
const commonUtil = require("../util/common.util")
const jwt = require("jsonwebtoken")
const { CONSTANTS } = require("../config/constants")

const activateUser = async (req, res, next) => {

    try {
        let activationCode = req.params.activationCode
        let updatedUser = await UserModel.findOneAndUpdate({ activationCode: activationCode }, { isActivated: true }).exec()
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {

    let email = req.body.email
    let password = req.body.password

    if (!email && !password)
        throw new BadRequestError("Both username and password is required !")

    try {
        let user = await userByEmail(email)

        if (!user || !commonUtil.compare(password, user.password))
            throw new ForbiddenError("Invalid Credential")


        const token = jwt.sign({ id: user._id, email: user.email }, CONSTANTS.JWT_KEY, { expiresIn: "1h" })

        let resp = {
            email: user.email,
            lastLogined: user.lastLogined,
            token: token
        }

        await UserModel.findOneAndUpdate({ email: email }, { lastLogined: new Date() }).exec()
        res.cookie('securedData', token, { maxAge: 3600000, httpOnly: false })
        res.status(200).json(resp)
    }
    catch (error) {
        next(error)
    }
}

const getRole = async (email) => {

    let user = await userByEmail(email)

    if (!user)
        throw new ResourceNotFoundError("User not found")

    return user.role
}

const userByEmail = async (email) => {

    let user = await UserModel.findOne({ email: email }).exec()
    return user
}

module.exports = {
    activateUser,
    login,
    userByEmail,
    getRole,
}