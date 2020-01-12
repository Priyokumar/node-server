const { server } = require("emailjs"),
    { CONSTANTS } = require("../../config/constants")

exports.sendEmail = (to, cc, subject, message) => {

    smtpClient = server.connect({

        user: CONSTANTS.SMTP_USER,
        password: CONSTANTS.SMTP_PASSWORD,
        host: CONSTANTS.SMTP_HOST,
        port: CONSTANTS.SMTP_PORT,
        ssl: true

    })

    let hclLogoPath = CONSTANTS.PUBLIC_PATH + "/images/hcl/hcl-logo.png"

    return new Promise((resolve, reject) => {

        smtpClient.send({
            text: '',
            from: CONSTANTS.FROM_ACCOUNT,
            to: to,
            cc: cc,
            subject: subject,
            attachment: [
                { data: message, alternative: true },
                { path: hclLogoPath, type: "image/jpg", headers: { "Content-ID": "<hcl-logo>" } }
            ]
        }, (err, messageStack) => {

            if (err) {
                console.log("Error while sending email")
                console.log(err)
                reject(err)
            } else {
                console.log("Email has successfully sent")
                resolve("Email has successfully sent")
            }
        })
    })

}    