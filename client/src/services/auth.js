import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

//function to set the authentication token in the request headers
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

//function to handle api for request for user login
export  const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/users`, {email, password});
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.response.data.message || 'Something went wrong'
        }

    }
}

//function to handle api for request for user registration
export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/users`, {name, email, password});
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.response.data.message || 'Something went wrong'
        }
    }
}

//function to handle api for request for user logout
export const logout = () => {
    setAuthToken();
}

//function to handle api for request for user profile
export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/users`);
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.response.data.message || 'Something went wrong'
        }
    }
}

//function to handle api for request for user profile update
export const updateProfile = async (name, email, password) => {
    try {
        const response = await axios.put(`${API_URL}/api/users`, {name, email, password});
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.response.data.message || 'Something went wrong'
        }
    }
}

//function to handle api for request for user profile delete
export const deleteProfile = async () => {
    try {
        const response = await axios.delete(`${API_URL}/api/users`);
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.response.data.message || 'Something went wrong'
        }
    }
}


