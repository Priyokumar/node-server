import { ax } from "../../api/axios"

export const getUsers = async () => {
    let response = await ax.get("/users", { withCredentials: true })
    return response.data
}

export const updateUserRole = async (user) => {
    let response = await ax.put("/users/" + user._id, user, { withCredentials: true })
    return response.data
}

export const deleteUser = async (id) => {
    let response = await ax.delete("/users/" + id, { withCredentials: true })
    return response.data
}

/* export const getUsersAction = () => {

    return async dispatch => {

        try {
            dispatch(startLoadingAction())
            let response = null;
            response = await ax.get("/users", { withCredentials: true })
            dispatch({
                type: ActionTypes.GET_USERS,
                users: response.data
            })
            dispatch(successAction())
        } catch (error) {
            dispatch(errorAction())
        }
    }
} */

/* export const updateUserRoleAction = (id, user) => {

    return async dispatch => {

        try {
            dispatch(startLoadingAction())
            let response = null;
            response = await ax.put("/users/" + id, user, { withCredentials: true })
            dispatch({
                type: ActionTypes.ADD_UPDATE_USER,
                user: response.data
            })
            dispatch(successAction())
        } catch (error) {
            dispatch(errorAction())
        }
    }
} */