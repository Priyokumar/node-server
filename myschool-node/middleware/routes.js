const contactUsRouter = require("../router/site/contact-us.router")
const authRouter = require("../router/auth.router")
const userRouter = require("../router/user.router")
const roleRouter = require("../router/role.router")
const employeeRouter = require("../router/employee/employee.router")
const fileRouter = require("../router/file/file.router")
const employeeSalaryPaymentRouter = require("../router/employee/employee-salary-payment.router")

const version = "v1"

exports.addRoutes = (app) => {

    app.use(`/${version}/api/contact-us`, contactUsRouter)
    app.use(`/${version}/api/auth`, authRouter)
    app.use(`/${version}/api/users`, userRouter)
    app.use(`/${version}/api/roles`, roleRouter)
    app.use(`/${version}/api/employees`, employeeRouter)
    app.use(`/${version}/api/files`, fileRouter)
    app.use(`/${version}/api/employee-salary-payments`, employeeSalaryPaymentRouter)


    return app
}