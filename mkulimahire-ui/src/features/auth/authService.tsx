import axios from "axios";

const API_URL = "/api/users/";

interface RegisterResponse {
  accessToken: string;
  // Add other properties if needed
}

interface LoginResponse {
  accessToken: string;
  // Add other properties if needed
}

const register = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
  return response.data;
};

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(API_URL + "login", {
    username,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = (): void => {
  localStorage.removeItem("user");
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
