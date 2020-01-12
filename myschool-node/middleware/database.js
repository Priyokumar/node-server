const mongoose = require('mongoose')
const { CONSTANTS } = require('../config/constants')

mongoose.connect(`mongodb://${CONSTANTS.DATABASE_USERNAME}:${CONSTANTS.DATABASE_PASSWORD}@${CONSTANTS.DATABASE_SERVER_ADDRESS}/${CONSTANTS.DATABASE_NAME}`, {
    useNewUrlParser: true
}, (err) => {
    if (!err)
        console.log('Mongoose Connection Succeeded.')
    else
        console.log('Error in Mongoose connection : ' + JSON.stringify(err, undefined, 2))
})
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

module.exports = mongoose;