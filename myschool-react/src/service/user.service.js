import { ax } from "../api/axios"

export const getRoles = async () => {
    let response = await ax.get("/roles", { withCredentials: true })
    return response.data
}

export const addUser = async (user) => {
    let response = await ax.post("/users", user, { withCredentials: true })
    return response.data
}