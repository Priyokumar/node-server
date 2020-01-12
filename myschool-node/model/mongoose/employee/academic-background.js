const mongoose = require('mongoose')
const Schema = mongoose.Schema

const academicBackgroundSchema = new Schema({

    name: {
        type: String,
        required: false,
    },

    board: {
        type: String,
        required: false,
    },

    schoolInstitue: {
        type: String,
        required: false,
    },

    passOutYear: {
        type: String,
        required: false,
    },

    score: {
        type: Number,
        required: false,
    },

    highestQualification: {
        type: Boolean,
        required: false,
        default : false
    }

})

module.exports = {
    academicBackgroundSchema
}