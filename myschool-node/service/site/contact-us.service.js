
const ContactUs = require("../../model/mongoose/site/contact-us.model");
const AdmissionEnquiry = require("../../model/mongoose/site/admission-enquiry.model");
const { BadRequestError, ForbiddenError, InternalServerError, ResourceNotFoundError } = require("../../util/api-error.util");

exports.contactUs = async (req, res, next) => {

    try {

        console.log("Contact Us -> Service -> contactUs");
        let contactUs = req.body;

        if (!contactUs.name || !contactUs.emailMobile || !contactUs.description)
            throw new BadRequestError("Bad request");

        let savedContactUs = await new ContactUs(contactUs).save();
        res.status(201).json(savedContactUs);

    }
    catch (error) {

        console.log("Contact Us -> Service -> contactUs -> Error");
        console.log(error);
        next(error);

    }
}

exports.admissionEnquiry = async (req, res, next) => {

    try {

        console.log("Contact Us -> service -> admissionEnquiry");
        let admissionEnquiry = req.body;

        if (!admissionEnquiry.name || !admissionEnquiry.emailMobile || !admissionEnquiry.standard || !admissionEnquiry.description)
            throw new BadRequestError("Bad request");

        let savedAdmissionEnquiry = await new AdmissionEnquiry(admissionEnquiry).save();
        res.status(201).json(savedAdmissionEnquiry);
    }
    catch (error) {
        console.log("Contact Us -> service -> admissionEnquiry -> Error")
        console.log(error)
        next(error)
    }
}