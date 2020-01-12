import ActionTypes from "../../constants/action-types.constant"

const initialState = {
    isLoading: false,
    hasError: false,
    hasSucceded: false
}

export const commonReducer = (state = initialState, action) => {

    const newState = {
        ...state
    };

    switch (action.type) {

        case ActionTypes.START_LOADING:
            newState.isLoading = true
            newState.hasError = false
            newState.hasSucceded = false
            break

        case ActionTypes.SUCCESS:
            newState.isLoading = false
            newState.hasError = false
            newState.hasSucceded = true
            break

        case ActionTypes.ERROR:
            newState.isLoading = false
            newState.hasError = true
            newState.hasSucceded = false
            break

        case ActionTypes.RESET_COMMON:
            newState.isLoading = false
            newState.hasError = false
            newState.hasSucceded = false
            break

        default:
            break

    }

    return newState
}