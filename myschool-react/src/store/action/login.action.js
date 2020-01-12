import { ax } from "../../api/axios"
import ActionTypes from "../../constants/action-types.constant"

export const login = loginData => {

    return async dispatch => {

        dispatch({
            type: ActionTypes.LOGIN
        })

        try {

            let response = await ax.post("/auth/login", loginData, { withCredentials: true })
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                loginData: response.data
            })

        } catch (error) {
            dispatch({
                type: ActionTypes.LOGIN_FAIL
            })
        }
    }
};