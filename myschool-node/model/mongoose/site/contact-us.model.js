const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const conatctUsSchema = new Schema({

    name: {
        type: String
    },

    emailMobile: {
        type: String,
    },

    description: {
        type: String
    }

})

module.exports = mongoose.model('ContactUs', conatctUsSchema)