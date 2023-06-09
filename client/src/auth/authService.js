import axios from "axios";

const REGISTER_URL = "/api/users/register";
const LOGIN_URL = "/api/users/login";

// Register user
const register = async (userData) => {
  const response = await axios.post(REGISTER_URL, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data.user;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
};

// Logout user
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
