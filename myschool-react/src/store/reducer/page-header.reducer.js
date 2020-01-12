import ActionTypes from "../../constants/action-types.constant"

const initialState = {
    title: ""
}

export const pageHeaderReducer = (state = initialState, action) => {

    const newState = {
        ...state
    };

    switch (action.type) {

        case ActionTypes.PAGE_HEADER:
            newState.title = action.title
            break

        default:
            break

    }

    return newState
}