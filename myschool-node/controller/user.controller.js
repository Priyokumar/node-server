
const userService = require("../service/user.service"),
    { ResourceNotFoundError, BadRequestError } = require("../util/api-error.util")

exports.addUser = async (req, res, next) => {

    try {
        let user = req.body
        if (!user)
            throw new BadRequestError("Registration data is empty")

        let savedUser = await userService.addUser(user)
        if (!savedUser)
            throw new ResourceNotFoundError("User not found")

        res.status(201).json(savedUser)
    }
    catch (error) {
        next(error)
    }
}

exports.getUserByEmail = async (req, res, next) => {

    console.log("User -> controller -> getUserByEmail ")
    try {
        let email = req.params.email

        let user = await userService.getUserByEmail(email)
        if (!user)
            throw new ResourceNotFoundError("User not found")
 
        console.log("User -> controller -> getUserByEmail -> returning data ->")
        console.log(user)
        res.status(200).json(user)
    }
    catch (error) {
        console.log("User -> controller -> getUserByEmail -> Error")
        next(error)
    }
}

exports.getAllUsers = async (req, res, next) => {

    try {
        let users = await userService.getAllUsers()
        res.status(201).json(users)
    }
    catch (error) {
        next(error)
    }
}