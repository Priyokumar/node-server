const trainingLocationService = require("../service/training-loc.service")
const { ResourceNotFoundError, BadRequestError } = require("../util/api-error.util")

exports.getAllTrainingLocations = async (req, res, next) => {
    try {
        console.log("Training location -> controller -> getAllTrainingLocations")
        res.status(200).json(await trainingLocationService.getAllTrainingLocations())

    } catch (error) {
        console.log("Training location controller -> getAllTrainingLocations -> Error")
        console.log(error)
        next(error)
    }
}

exports.addTrainingLocation = async (req, res, next) => {

    try {
        console.log("Training location -> controller -> addTrainingLocation")
        let trainingLocation = req.body
        let savedUser = await trainingLocationService.addTrainingLocation(trainingLocation)
        res.status(201).json(savedUser)
    }
    catch (error) {
        console.log("Training location -> controller -> addTrainingLocation -> Error")
        console.log(error)
        next(error)
    }
}