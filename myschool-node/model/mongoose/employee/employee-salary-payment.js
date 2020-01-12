const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSalaryPaymentSchema = new Schema({

    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },

    year: {
        type: String,
        required: true,
    },

    month: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    comments: {
        type: String,
    }
})

module.exports = mongoose.model('EmployeeSalaryPayment', employeeSalaryPaymentSchema)