import axios from "axios";

const REGISTER_URL = "/users/register";
const LOGIN_URL = "/users/login";

// Register user
const register = async (userData) => {
  const response = await axios.post(REGISTER_URL, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
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
