import ActionTypes from "../../constants/action-types.constant"

const initialState = {
    roles: [],
    savedRole: null,
    role: null
}

export const rolesReducer = (state = initialState, action) => {

    const newState = {
        ...state
    }

    switch (action.type) {

        case ActionTypes.GET_ROLES:
            newState.roles = action.roles
            break

        case ActionTypes.ADD_ROLE:
            newState.savedRole = action.savedRole
            break

        case ActionTypes.GET_ROLE_BY_ID:
            newState.role = action.role
            break

        case ActionTypes.DELETE_ROLE:
            newState.role = action.deletedRole
            break

        default:
            break

    }

    return newState
}