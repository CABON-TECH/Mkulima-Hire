import axios from "axios";

const API_URL = "/api/users/";

const register = async (username, email, password) => {
  const response = await axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
  return response.data;
};

/*if (response.data.accessToken) {
  localStorage.setItem('user', JSON.stringify(response.data));
}*/

//login user
const login = async (username, password) => {
  const response = await axios.post(API_URL + "login", {
    username,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
