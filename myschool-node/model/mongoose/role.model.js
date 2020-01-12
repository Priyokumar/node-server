const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
require("./menu.model")

const subMenuSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    order: {
        type: String
    },

    icon: {
        type: String,
        required: true,
    },

    link: {
        type: String,
        required: false,
    }

})

const menuSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    order: {
        type: Number
    },

    icon: {
        type: String,
    },

    link: {
        type: String,
    },

    hasSubMenus: {
        type: Boolean,
        required: true,
    },
    subMenus: {
        type: [subMenuSchema],
        default: []
    }

})

const roleSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
    },

    menus: {
        type: [menuSchema],
        default: []
    },
})

module.exports = mongoose.model('Role', roleSchema)