const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { documentSchema } = require("../document.model")

const personalSchema = new Schema({

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



})

module.exports = {
    personalSchema
}