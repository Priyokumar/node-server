const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
require("./role.model")

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        validate: (value) => validator.isEmail(value),
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    lastLogined: {
        type: Date,
        required: false,
    },

    empId: {
        type: String,
        required: true,
        unique: true
    },

    isActivated: {
        type: Boolean,
        required: true,
        default: false
    },

    activationCode: {
        type: String,
        required: true,
        unique: true
    }, 
    mobileNo: {
        type: String,
        required: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    }
})

module.exports = mongoose.model('User', userSchema)