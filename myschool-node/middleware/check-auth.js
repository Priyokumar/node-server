const jwt = require("jsonwebtoken")
const { ForbiddenError } = require("../util/api-error.util")
const { CONSTANTS } = require("../config/constants")

module.exports = (req, res, next) => {

    let securedData = req.cookies.securedData

    try {
        let decode = jwt.verify(securedData, CONSTANTS.JWT_KEY, null)
        req.securedData = decode
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized access" })
    }

}