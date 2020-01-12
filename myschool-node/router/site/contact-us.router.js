const router = require("express").Router();
const contactService = require("../../service/site/contact-us.service");

router.post("/", (req, res, next) => contactService.contactUs(req, res, next));
router.post("/admission-enquiry", (req, res, next) => contactService.admissionEnquiry(req, res, next));

module.exports = router;