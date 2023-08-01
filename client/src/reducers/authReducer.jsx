import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/actionTypes";

const initialState = {
    user: {},
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                user: {},
                error: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: {},
                error: null
            }
        default:
            return state;
    }
}

export default authReducer;