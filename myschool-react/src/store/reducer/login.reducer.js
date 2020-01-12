import { fakeAuth } from "../../component/auth/private-route"
import ActionTypes from "../../constants/action-types.constant"


const initialState = {
    hasLogined: false,
    isLogging: false,
    hasError: false,
    loginData: null,
    redirectToReferrer: false
}

export const loginReducer = (state = initialState, action) => {

    const newState = {
        ...state
    };

    switch (action.type) {

        case ActionTypes.LOGIN:
            newState.isLogging = true
            break

        case ActionTypes.LOGIN_SUCCESS:
            newState.hasLogined = true
            newState.loginData = action.loginData

            fakeAuth.authenticate()
            newState.redirectToReferrer = true
            newState.isLogging = false
            break

        case ActionTypes.LOGIN_FAIL:
            newState.hasError = true
            newState.isLogging = false
            break

        default:
            break

    }

    return newState
}