const router = require("express").Router()
const fileService = require("../../service/file/file.service")
const checkAuth = require("../../middleware/check-auth")


router.post("/",checkAuth, (req, res, next) => fileService.uploadFile(req, res, next))
router.get("/:id",checkAuth, (req, res, next) => fileService.downloadFile(req, res, next))

module.exports = router