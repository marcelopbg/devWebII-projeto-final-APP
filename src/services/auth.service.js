import axios from "axios";
import authHeader from './auth.header';
import backendURL from './backend.url';
const API_URL = backendURL+"/api/auth/";


const login = (username, password) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  const logout = () => {
    localStorage.removeItem("user");
  }
  const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    },
    {headers: authHeader()});
  }
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
  }
  
  export {
      login,
      logout,
      register,
      getCurrentUser
  };