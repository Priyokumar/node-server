const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const { addressSchema } = require("../address.model")
const { employeeHistorySchema } = require("../employee/employee-history.model")
const { academicBackgroundSchema } = require("../employee/academic-background")

const employeeSchema = new Schema({

    firstName: {
        type: String,
        required: true,
    },

    middleName: {
        type: String,
        required: false,
    },

    lastName: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        validate: (value) => validator.isEmail(value),
        unique: true
    },

    mobileNo: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: false,
    },

    salary: {
        type: Number,
        required: false,
    },

    dob: {
        type: String,
        required: true,
    },

    joiningDate: {
        type: String,
        required: true,
    },

    employeeType: {
        type: String,
        required: true,
        default: ""
    },

    designation: {
        type: String,
        required: false,
    },

    panCard: {
        type: String,
        required: false,
    },

    aadharCard: {
        type: String,
        required: false,
    },

    voterId: {
        type: String,
        required: false,
    },

    drivingLicence: {
        type: String,
        required: false,
    },

    sameAscorrAddress: {
        type: Boolean,
        required: false,
        default: false
    },

    correspondentAddress: {
        type: addressSchema,
        required: false,
    },

    permanentAddress: {
        type: addressSchema,
        required: false,
    },

    hasExperienced: {
        type: Boolean,
        required: false,
    },

    fresherOrExperienced: {
        type: String,
        required: true,
    },

    employeeHistories: {
        type: [employeeHistorySchema],
        required: false,
    },

    academicHistories: {
        type: [academicBackgroundSchema],
        required: false,
    },

    photoDocId: {
        type: String,
        required: false,
    },
    aadhaarDocId: {
        type: String,
        required: false,
    },
    panDocId: {
        type: String,
        required: false,
    },
    XDocId: {
        type: String,
        required: false,
    },
    XIIDocId: {
        type: String,
        required: false,
    },
    graduationDocId: {
        type: String,
        required: false,
    },
    postGraduationDocId: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('Employee', employeeSchema)