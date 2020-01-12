const enrollmentService = require("../service/enrollment.service")
const { ResourceNotFoundError, BadRequestError } = require("../util/api-error.util")


exports.addEnrollment = async (req, res, next) => {

    console.log("Enrollment -> controller -> addEnrollment ")
    try {
        let enrollment = req.body
        if (!enrollment)
            throw new BadRequestError("Enrollment data is empty")

        let savedEnrollment = await enrollmentService.addEnrollment(enrollment)
        if (!savedEnrollment)
            throw new ResourceNotFoundError("Enrollment not found")

        res.status(201).json(savedEnrollment)
    }
    catch (error) {
        console.log("Enrollment -> controller -> addEnrollment -> Error")
        console.log(error)
        next(error)
    }
}