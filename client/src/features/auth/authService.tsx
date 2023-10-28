import axios from 'axios';

interface RegisterParams {
  username: string;
  email: string;
  password: string;
  role: string;
}
interface LoginParams {
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const register = async ({
  username,
  email,
  password,
  role,
}: RegisterParams) => {
  const response = await axios.post(API_URL + 'users/register', {
    name: username,
    email: email,
    password: password,
    role: role,
  });
  // Store user data in localStorage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//login user
const login = async ({ email, password }: LoginParams) => {
  const response = await axios.post(
    API_URL + 'users/login',
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
