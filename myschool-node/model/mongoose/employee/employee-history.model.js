const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeHistorySchema = new Schema({

    employerName: {
        type: String,
        required: false,
    },

    address: {
        type: String,
        required: false,
    },

    startFrom: {
        type: Number,
        required: false,
    },

    endTo: {
        type: Number,
        required: false,
    },

    designation: {
        type: String,
        required: false,
    }

})

module.exports = {
    employeeHistorySchema
}