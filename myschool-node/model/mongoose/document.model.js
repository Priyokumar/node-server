const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({

    name: {
        type: String,
        required: false,
    },

    path: {
        type: String,
        required: false,
    }
})

const DocumentModel = mongoose.model('Document', documentSchema)

module.exports = {
    documentSchema,
    DocumentModel
}