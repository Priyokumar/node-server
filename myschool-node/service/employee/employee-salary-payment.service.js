const EmployeeSalaryPaymentModel = require("../../model/mongoose/employee/employee-salary-payment")

const addEmployeeSalaryPayment = async (req, res, next) => {

    try {
        let employeeSalaryPayment = req.body

        let EmployeeSalaryPayment = new EmployeeSalaryPaymentModel(employeeSalaryPayment)
        let savedEmployeeSalaryPayment = await EmployeeSalaryPayment.save()

        res.status(201).json(savedEmployeeSalaryPayment)
    }
    catch (error) {
        next(error)
    }
}

const updateEmployeeSalaryPayment = async (req, res, next) => {

    try {
        let employeeSalaryPayment = req.body
        let id = req.params.id

        console.log("Inside Update employeeSalaryPayment")
        let savedEmployeeSalaryPayment = await EmployeeSalaryPaymentModel.findByIdAndUpdate({ _id: id }, employeeSalaryPayment, { upsert: true }).exec()

        console.log("After Update employeeSalaryPayment")
        res.status(200).json(savedEmployeeSalaryPayment)
    }
    catch (error) {
        console.log("Error Update employeeSalaryPayment")
        console.log(error)
        next(error)

    }
}

const deleteEmployeeSalaryPayment = async (req, res, next) => {

    try {
        let id = req.params.id

        console.log("Inside Update employeeSalaryPayment")
        let deletedEmployeeSalaryPayment = await EmployeeSalaryPaymentModel.findOneAndRemove({ _id: id }).exec()

        console.log("After Update employeeSalaryPayment")
        res.status(200).json(deletedEmployeeSalaryPayment)
    }
    catch (error) {
        console.log("Error Update employeeSalaryPayment")
        console.log(error)
        next(error)

    }
}

const getEmployeeSalaryPayment = async (req, res, next) => {

    try {

        let id = req.params.id
        let employeeSalaryPayment = await EmployeeSalaryPaymentModel.findOne({ _id: id }, null, {}).exec()
        console.log(employeeSalaryPayment)
        res.status(200).json(employeeSalaryPayment)

    } catch (error) {
        next(error)
    }

}

const getEmployeeSalaryPayments = async (req, res, next) => {

    try {
        let employeeSalaryPayments = await EmployeeSalaryPaymentModel.find({}).exec()
        console.log(employeeSalaryPayments)
        res.status(200).json(employeeSalaryPayments)
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    addEmployeeSalaryPayment,
    updateEmployeeSalaryPayment,
    deleteEmployeeSalaryPayment,
    getEmployeeSalaryPayment,
    getEmployeeSalaryPayments
}