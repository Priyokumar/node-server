import ActionTypes from "../../constants/action-types.constant"

export const successAction = () => {
    return {
        type: ActionTypes.SUCCESS
    }
}

export const errorAction = () => {
    return {
        type: ActionTypes.ERROR
    }
}

export const startLoadingAction = () => {
    return {
        type: ActionTypes.START_LOADING
    }
}

export const resetAction = () => {
    return {
        type: ActionTypes.RESET_COMMON
    }
}