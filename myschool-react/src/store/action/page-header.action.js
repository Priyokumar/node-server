import ActionTypes from "../../constants/action-types.constant"
export const setPageHeaderAction = title => {

    return dispatch => {

        dispatch({
            type: ActionTypes.PAGE_HEADER,
            title: title
        })
    }
}