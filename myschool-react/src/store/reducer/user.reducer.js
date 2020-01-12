import ActionTypes from "../../constants/action-types.constant"

const initialState = {
    users: [],
    user: null
}

export const userReducer = (state = initialState, action) => {

    const newState = {
        ...state
    };

    switch (action.type) {

        case ActionTypes.GET_USERS:
            newState.users = action.users
            break

        case ActionTypes.ADD_UPDATE_USER:
            newState.user = action.user
            break

        default:
            break

    }

    return newState
}