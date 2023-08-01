import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actionTypes";
import { login as loginService, logout as logoutService, register as registerService } from "../services/auth";

//action creator for successful authentication
const authSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }

}

//action creator for failed authentication
const authFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

//action creator for logout
export const logout = () => {
    return {
        type: LOGOUT
    }
}

//action creator for login
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await loginService(email, password);
            if (response.error) {
                dispatch(authFailure(response.message));
            } else {
                dispatch(authSuccess(response));
            }
        } catch (error) {
            dispatch(authFailure(error.message));
        }
    }
}

//action creator for register
export const register = (name, email, password) => {
    return async (dispatch) => {
        try {
            const response = await registerService(name, email, password);
            if (response.error) {
                dispatch(authFailure(response.message));
            } else {
                dispatch(authSuccess(response));
            }
        } catch (error) {
            dispatch(authFailure(error.message));
        }
    }
}

//action creator for getProfile
export const getProfile = () => {
    return async (dispatch) => {
        try {
            const response = await loginService();
            if (response.error) {
                dispatch(authFailure(response.message));
            } else {
                dispatch(authSuccess(response));
            }
        } catch (error) {
            dispatch(authFailure(error.message));
        }
    }
}

//action creator for updateProfile
export const updateProfile = (name, email, password) => {
    return async (dispatch) => {
        try {
            const response = await registerService(name, email, password);
            if (response.error) {
                dispatch(authFailure(response.message));
            } else {
                dispatch(authSuccess(response));
            }
        } catch (error) {
            dispatch(authFailure(error.message));
        }
    }
}

//action creator for logout
export const signout = () => {
    return async (dispatch) => {
        try {
            await logoutService();
            dispatch(logout());
        } catch (error) {
            dispatch(authFailure(error.message));
        }
    }
}


