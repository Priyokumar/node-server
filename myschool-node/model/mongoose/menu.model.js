const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const menuSchema = new Schema({

    title: {
        type: String,
        required: true,
    },

    order: {
        type: String,
        validate: (value) => validator.isEmail(value),
        unique: true
    },

    icon: {
        type: String,
        required: true,
    },

    link: {
        type: Date,
        required: false,
    },

    hasSubmenu: {
        type: Boolean,
        required: true,
    },
    submenus: {
        type: Array,
        default: []
    }

})

module.exports = mongoose.model('Menu', menuSchema)