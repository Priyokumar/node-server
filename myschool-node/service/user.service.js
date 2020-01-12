const UserModel = require("../model/mongoose/user.model")
const uuid = require('uuid/v4')
const commonUtil = require("../util/common.util")
const { ConflictError } = require("../util/api-error.util")

const addUser = async (req, res, next) => {

    try {
        let user = req.body

        if (!user.name || !user.email || !user.empId)
            throw new BadRequestError("Bad Request !")

        let existingUser = await UserModel.findOne({ email: user.email }, null, {}).exec()
        if (existingUser)
            throw new ConflictError("User has already created")

        user.password = commonUtil.encryptPassword("test12")
        user.activationCode = uuid()
        let User = new UserModel(user)
        let savedUser = await User.save()

        res.status(201).json(savedUser)
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}

const updateUser = async (req, res, next) => {

    try {
        let user = req.body
        let id = req.params.id

        if (!user.name || !user.email || !user.empId)
            throw new BadRequestError("Bad Request !")

        console.log("Inside Update role")
        let savedUser = await UserModel.findOneAndUpdate({ _id: id }, user).exec()

        console.log("After Update role")
        res.status(200).json(savedUser)
    }
    catch (error) {
        console.log("Error Update role")
        console.log(error)
        next(error)

    }
}

const deleteUser = async (req, res, next) => {

    try {
        let id = req.params.id

        console.log("Inside Update role")
        let deletedUser = await UserModel.findOneAndRemove({ _id: id }).exec()

        console.log("After Update role")
        res.status(200).json(deletedUser)
    }
    catch (error) {
        console.log("Error Update role")
        console.log(error)
        next(error)

    }
}

const getUserByEmail = async (req, res, next) => {

    try {

        let email = req.params.email
        let user = await UserModel.findOne({ email: email }, null, {}).exec()
        console.log(user)
        res.status(200).json(user)

    } catch (error) {
        next(error)
    }

}

const getAllUsers = async (req, res, next) => {

    try {
        let users = await UserModel.find({}).populate("role").exec()
        console.log(users)
        res.status(201).json(users)
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser
}