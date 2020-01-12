const path = require('path')
const formidable = require('formidable')
const fs = require("fs")
const { promisify } = require("util")
const { BadRequestError, ForbiddenError, InternalServerError, ResourceNotFoundError } = require("../../util/api-error.util")
const { DocumentModel } = require("../../model/mongoose/document.model")
const { updateEmployeeData } = require("../../service/employee/employee.service")

const uploadFile = (req, res, next) => {

    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    //set max filesize 25 MB
    form.maxFileSize = 25 * 1024 * 1024
    form.parse(req, async (err, fields, files) => {

        try {

            if (err) {
                console.log(err)
                throw new InternalServerError("Error occurred while parsing form data")
            }

            let filePath = "./public/uploads"
            let fileName = "FILE-";
            let file = ""
            let documentName = fields.documentName
            let type = fields.type
            let id = fields.id
            let fileFor = fields.fileFor

            if (!fileFor || !documentName || !type || !id)
                throw new BadRequestError("Bad request")

            if (fileFor === "employee") {
                filePath += "/employee/" + id
                fileName += type.toUpperCase() + "-" + Date.now() + path.extname(files.file.name)
                file = filePath + "/" + fileName
            }

            let saveDoc = await saveFile(filePath, files, file, documentName);
            let docId = saveDoc.id


            if (fileFor === "employee") {

                if (type === "photo") {
                    await updateEmployeeData(id, "photoDocId", docId)
                }
                else if (type === "aadhaar") {
                    await updateEmployeeData(id, "aadhaarDocId", docId)
                }
                else if (type === "pan") {
                    await updateEmployeeData(id, "panDocId", docId)
                }
                else if (type === "10_CERTIFICATE") {
                    await updateEmployeeData(id, "XDocId", docId)
                }
                else if (type === "10+2_CERTIFICATE") {
                    await updateEmployeeData(id, "XIIDocId", docId)
                }
                else if (type === "GRADUATE_CERTIFICATE") {
                    await updateEmployeeData(id, "graduationDocId", docId)
                }
                else if (type === "POST_GRADUATE_CERTIFICATE") {
                    await updateEmployeeData(id, "postGraduationDocId", docId)
                }
            }

            res.status(200).json({ status: "done" })

        } catch (error) {
            next(error)
        }

    })
}

const downloadFile = async (req, res, next) => {

    let id = req.params.id
    try {

        let document = await DocumentModel.findById({ _id: id }).exec()
        if (!document || !document.path)
            throw new ResourceNotFoundError("File not found")

        res.download(document.path)

    } catch (error) {
        next(error)
    }
}

const saveFile = async (filePath, files, file, documentName) => {

    let mkdir = promisify(fs.mkdir)
    let copyFile = promisify(fs.copyFile)
    let unlink = promisify(fs.unlink)
    await mkdir(filePath, { recursive: true })
    let oldPath = files.file.path
    await copyFile(oldPath, file)
    await unlink(oldPath)

    let document = new DocumentModel()
    document.name = documentName
    document.path = file

    let savedDoc = await document.save()

    return savedDoc
}

module.exports = {
    uploadFile: uploadFile,
    downloadFile: downloadFile
}


