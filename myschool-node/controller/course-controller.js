const courseService = require("../service/course.service")
const { ResourceNotFoundError, BadRequestError } = require("../util/api-error.util")

exports.getAllCourses = async (req, res, next) => {
    try {

        console.log("Course -> controller -> getAllCourses")
        res.status(200).json(await courseService.getAllCourses())

    } catch (error) {
        console.log("Course controller -> getAllCourses -> Error")
        console.log(error)
        next(error)
    }
}

exports.addCourse = async (req, res, next) => {

    try {

        console.log("Course -> controller -> addCourse")
        let course = req.body
        let savedCourse = await courseService.addCourse(course)
        res.status(201).json(savedCourse)
    }
    catch (error) {
        console.log("Course -> controller -> addCourse -> Error")
        console.log(error)
        next(error)
    }
}

exports.getCourse = async (req, res, next) => {
    try {
        console.log("Course -> controller -> getCourse")
        res.status(200).json(await courseService.getCourse(req.params.courseId))

    } catch (error) {
        console.log("Course controller -> getCourse -> Error")
        console.log(error)
        next(error)
    }
}