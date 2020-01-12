import { errorAction, startLoadingAction, successAction } from "./common.action"
import { ax } from "../../api/axios"
import ActionTypes from "../../constants/action-types.constant"

export const getRoles = async () => {
    let response = await ax.get("/roles", { withCredentials: true })
    return response.data
}

export const getRolesAction = () => {

    return async dispatch => {

        try {

            dispatch(startLoadingAction())
            let response = null;
            response = await ax.get("/roles", { withCredentials: true })
            dispatch({
                type: ActionTypes.GET_ROLES,
                roles: response.data
            })
            dispatch(successAction())
        } catch (error) {
            dispatch(errorAction())
        }
    }
}

export const getRoleByIdAction = roleId => {

    return async dispatch => {
        try {
            let response = null;
            response = await ax.get("/roles/" + roleId, { withCredentials: true })
            dispatch({
                type: ActionTypes.GET_ROLE_BY_ID,
                role: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const addRoleAction = (role) => {

    return async dispatch => {

        try {

            dispatch(startLoadingAction())
            let response = null;
            response = await ax.post("/roles", role, { withCredentials: true })
            dispatch({
                type: ActionTypes.ADD_ROLE,
                savedRole: response.data
            })
            dispatch(successAction())
        } catch (error) {
            dispatch(errorAction())
        }
    }
}

export const updateRoleAction = (roleId, role) => {

    return async dispatch => {

        try {

            dispatch(startLoadingAction())
            let response = null;
            response = await ax.put("/roles/" + roleId, role, { withCredentials: true })
            dispatch({
                type: ActionTypes.ADD_ROLE,
                savedRole: response.data
            })
            dispatch(successAction())
        } catch (error) {
            dispatch(errorAction())
        }
    }
}

export const deleteRoleAction = (roleId) => {

    return async dispatch => {

        try {

            dispatch(startLoadingAction())
            let response = null;
            response = await ax.delete("/roles/" + roleId, { withCredentials: true })
            dispatch({
                type: ActionTypes.DELETE_ROLE,
                deletedRole: response.data
            })
            dispatch(successAction())
        } catch (error) {
            dispatch(errorAction())
        }
    }
}