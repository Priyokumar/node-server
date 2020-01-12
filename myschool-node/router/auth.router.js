const router = require("express").Router()
const authService = require("../service/auth.service")
const checkAuth = require("../middleware/check-auth")

router.post("/login", (req, res, next) => authService.login(req, res, next))
router.get("/role/:email", checkAuth, (req, res, next) => authService.getRole(req, res, next))
router.patch("/activate/:activationCode", checkAuth, (req, res, next) => authService.activateUser(req, res, next))

module.exports = router