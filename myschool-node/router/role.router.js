const router = require("express").Router()
const roleService = require("../service/role.service")
const checkAuth = require("../middleware/check-auth")

router.get("/", checkAuth, (req, res, next) => roleService.getRoles(req, res, next))
router.post("/", checkAuth, (req, res, next) => roleService.addRole(req, res, next))
router.get("/:roleId", checkAuth, (req, res, next) => roleService.getRole(req, res, next))
router.put("/:roleId", checkAuth, (req, res, next) => roleService.updateRole(req, res, next))
router.delete("/:roleId", checkAuth, (req, res, next) => roleService.deleteRole(req, res, next))


module.exports = router