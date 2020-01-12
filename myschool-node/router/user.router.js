const router = require("express").Router()
const userService = require("../service/user.service")
const checkAuth = require("../middleware/check-auth")

router.get("/", checkAuth, (req, res, next) => userService.getAllUsers(req, res, next))
router.get("/email/:email", checkAuth, (req, res, next) => userService.getUserByEmail(req, res, next))
router.post("/", checkAuth, (req, res, next) => userService.addUser(req, res, next))
router.put("/:id", checkAuth, (req, res, next) => userService.updateUser(req, res, next))
router.delete("/:id", checkAuth, (req, res, next) => userService.deleteUser(req, res, next))

module.exports = router 