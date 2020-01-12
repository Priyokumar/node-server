
import { ax } from "../api/axios"

export const getEmployees = async (id) => {
    let response = await ax.get("/files/" + id, { withCredentials: true })
    return response.data
}

export const upload = async (fileData) => {


    const formData = new FormData()
    formData.append("file",fileData.file)
    formData.append("type",fileData.type)
    formData.append("id",fileData.id)
    formData.append("documentName",fileData.documentName)
    formData.append("fileFor",fileData.fileFor)

    let response = await ax.post("/files", formData, { withCredentials: true })
    return response.data
}