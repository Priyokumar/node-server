const router = require("express").Router()
const employeeSalaryPaymentService = require("../../service/employee/employee-salary-payment.service")
const checkAuth = require("../../middleware/check-auth")

router.get("/", checkAuth, (req, res, next) => employeeSalaryPaymentService.getEmployeeSalaryPayments(req, res, next))
router.post("/", checkAuth, (req, res, next) => employeeSalaryPaymentService.addEmployeeSalaryPayment(req, res, next))
router.get("/:id", checkAuth, (req, res, next) => employeeSalaryPaymentService.getEmployeeSalaryPayment(req, res, next))
router.put("/:id", checkAuth, (req, res, next) => employeeSalaryPaymentService.updateEmployeeSalaryPayment(req, res, next))
router.delete("/:id", checkAuth, (req, res, next) => employeeSalaryPaymentService.deleteEmployeeSalaryPayment(req, res, next))

module.exports = router 