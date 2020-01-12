const RoleModel = require("../model/mongoose/role.model")

const addRole = async (req, res, next) => {

    try {
        let role = req.body

        if (!role.name)
            throw new BadRequestError("Bad Request !")

        let Role = new RoleModel(role)
        let savedRole = await Role.save()

        res.status(201).json(savedRole)
    }
    catch (error) {
        next(error)
    }
}

const updateRole = async (req, res, next) => {

    try {

        let roleId = req.params.roleId
        let role = req.body
        let updatedRole = await RoleModel.findOneAndUpdate({ _id: roleId }, role).exec()
        console.log(updatedRole)
        res.status(200).json(updatedRole)

    } catch (error) {
        next(error)
    }

}

const getRole = async (req, res, next) => {

    try {

        let roleId = req.params.roleId
        let role = await RoleModel.findOne({ _id: roleId }, null, {}).exec()
        console.log(role)
        res.status(200).json(role)

    } catch (error) {
        next(error)
    }

}

const getRoles = async (req, res, next) => {

    try {
        let roles = await RoleModel.find({}).exec()
        console.log(roles)
        res.status(201).json(roles)
    }
    catch (error) {
        next(error)
    }
}


const deleteRole = async (req, res, next) => {

    try {

        let roleId = req.params.roleId
        let role = await RoleModel.findOneAndRemove({ _id: roleId }).exec()
        console.log(role)
        res.status(200).json(role)

    } catch (error) {
        next(error)
    }

}

module.exports = {
    addRole,
    getRole,
    getRoles,
    deleteRole,
    updateRole
}