import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

const register = async ({ username, email, password, role }) => {
  const response = await axios.post(API_URL + "register", {
    name: username,
    email: email,
    password: password,
    role: role,
  });

  // Store user data in localStorage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

/*if (response.data.accessToken) {
  localStorage.setItem('user', JSON.stringify(response.data));
}*/

//login user
const login = async ({ email, password }) => {
  /*const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};*/
  const response = await axios.post(
    API_URL + "login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
