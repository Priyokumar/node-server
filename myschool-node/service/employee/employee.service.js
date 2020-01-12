const EmployeeModel = require("../../model/mongoose/employee/employee.model")

const addEmployee = async (req, res, next) => {

    try {
        let employee = req.body

        let Employee = new EmployeeModel(employee)
        let savedEmployee = await Employee.save()

        res.status(201).json(savedEmployee)
    }
    catch (error) {
        next(error)
    }
}

const updateEmployee = async (req, res, next) => {

    try {
        let employee = req.body
        let id = req.params.id

        console.log("Inside Update Employee")
        let savedEmployee = await EmployeeModel.findByIdAndUpdate({ _id: id }, employee, { upsert: true }).exec()

        console.log("After Update Employee")
        res.status(200).json(savedEmployee)
    }
    catch (error) {
        console.log("Error Update Employee")
        console.log(error)
        next(error)

    }
}

const deleteEmployee = async (req, res, next) => {

    try {
        let id = req.params.id

        console.log("Inside Update Employee")
        let deletedEmployee = await EmployeeModel.findOneAndRemove({ _id: id }).exec()

        console.log("After Update Employee")
        res.status(200).json(deletedEmployee)
    }
    catch (error) {
        console.log("Error Update Employee")
        console.log(error)
        next(error)

    }
}

const getEmployee = async (req, res, next) => {

    try {

        let id = req.params.id
        let employee = await EmployeeModel.findOne({ _id: id }, null, {}).exec()
        console.log(employee)
        res.status(200).json(employee)

    } catch (error) {
        next(error)
    }

}

const getEmployees = async (req, res, next) => {

    try {
        let employees = await EmployeeModel.find({}).exec()
        console.log(employees)
        res.status(200).json(employees)
    }
    catch (error) {
        next(error)
    }
}

const updateEmployeeData = async (id, field, val) => {

    try {
        console.log("Inside Update Employee data")
        let savedEmployee = await EmployeeModel.findByIdAndUpdate({ _id: id }, { [field]: val }, { upsert: true }).exec()
        console.log("After Update Employee")
        res.status(200).json(savedEmployee)
    }
    catch (error) {
        console.log("Error Update Employee")
        console.log(error)
    }
}

module.exports = {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getEmployees,
    updateEmployeeData
}