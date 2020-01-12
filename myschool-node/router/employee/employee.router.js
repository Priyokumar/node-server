const router = require("express").Router()
const employeeService = require("../../service/employee/employee.service")
const checkAuth = require("../../middleware/check-auth")

router.get("/",checkAuth, (req, res, next) => employeeService.getEmployees(req, res, next))
router.post("/",checkAuth, (req, res, next) => employeeService.addEmployee(req, res, next))
router.get("/:id",checkAuth, (req, res, next) => employeeService.getEmployee(req, res, next))
router.put("/:id",checkAuth, (req, res, next) => employeeService.updateEmployee(req, res, next))
router.delete("/:id",checkAuth, (req, res, next) => employeeService.deleteEmployee(req, res, next))

module.exports = router 