const bcrypt = require('bcryptjs')


exports.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

exports.compare = (password, encPassword) => {
    return bcrypt.compareSync(password, encPassword)
}