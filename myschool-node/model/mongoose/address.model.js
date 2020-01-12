const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({

    addressLine: {
        type: String,
        required: false,
    },

    country: {
        type: String,
        required: false,
    },

    state: {
        type: String,
        required: false,
    },

    district: {
        type: String,
        required: false,
    }

})

module.exports = {
    addressSchema
}