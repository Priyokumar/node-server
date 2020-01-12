const courseScheduleService = require("../service/course-schedule.service")
const { ResourceNotFoundError, BadRequestError } = require("../util/api-error.util")

exports.getAllCourseSchedules = async (req, res, next) => {
    try {

        console.log("Course Schedule -> controller -> getAllCourseSchedules")
        res.status(200).json(await courseScheduleService.getAllCourseSchedules())

    } catch (error) {
        console.log("Course Schedule -> controller -> getAllCourseSchedules -> Error")
        console.log(error)
        next(error)
    }
}

exports.addCourseSchedule = async (req, res, next) => {

    try {

        console.log("Course Schedule -> controller -> addCourseSchedule")
        let courseSchedule = req.body
        let savedCourseSchedule = await courseScheduleService.addCourseSchedule(courseSchedule)
        res.status(201).json(savedCourseSchedule)
    }
    catch (error) {
        console.log("Course Schedule -> controller -> addCourseSchedule -> Error")
        console.log(error)
        next(error)
    }
}

exports.getCourseSchedule = async (req, res, next) => {
    try {
        
        console.log("Course Schedule -> controller -> getCourseSchedule")

        let courseSchedule = await courseScheduleService.getCourseSchedule(req.params.courseScheduleId)
        if (!courseSchedule)
            throw new ResourceNotFoundError("Course Schedule not found")

        res.status(200).json(courseSchedule)

    } catch (error) {
        console.log("Course Schedule controller -> getCourse -> Error")
        console.log(error)
        next(error)
    }
}

exports.getCourseSchedulesByCourseId = async (req, res, next) => {
    try {
        
        console.log("Course Schedule -> controller -> getCourseSchedulesByCourseId")
        let courseSchedules = await courseScheduleService.getCourseSchedulesByCourseId(req.params.courseId)
        res.status(200).json(courseSchedules)

    } catch (error) {
        console.log("Course Schedule controller -> getCourseSchedulesByCourseId -> Error")
        console.log(error)
        next(error)
    }
}