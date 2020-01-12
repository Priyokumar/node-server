const { publicPath } = require("../index")

const CONSTANTS = {

    /* APPLICATION */
    SERVER_PORT: 3000,

    /* DATABASE */
    DATABASE_SERVER_ADDRESS: '127.0.0.1:27017',
    DATABASE_USERNAME: 'test',
    DATABASE_PASSWORD: 'test',
    DATABASE_NAME: 'test',
    SESSION_STORE_COLLECTION_NAME: 'sessions',

    /* EMAIL */
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_USER: 'pesleishangthem@gmail.com',
    SMTP_PASSWORD: 'pzhahgcttjquddsd',
    SMTP_PORT: 587,
    FROM_ACCOUNT: 'PES Leishangthem <pesleishangthem@gmail.com>',

    MAIL_BOX: "pesleishangthem@gmail.com",

    PUBLIC_PATH: publicPath,

    JWT_KEY : "loser'sKey"
}

module.exports = {
    CONSTANTS
}
