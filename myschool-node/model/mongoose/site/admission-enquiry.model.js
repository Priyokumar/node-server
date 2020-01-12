const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const admissionEnquirySchema = new Schema({

    name: {
        type: String
    },

    emailMobile: {
        type: String
    },

    standard: {
        type: String
    },

    description: {
        type: String
    }

})

module.exports = mongoose.model('AdmissionEnquiry', admissionEnquirySchema)