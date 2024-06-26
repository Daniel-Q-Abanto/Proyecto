import axios from 'axios';

const baseURL = 'http://localhost:8000'; 

const loginService = {
  login: async (username, password) => {
    const response = await axios.post(`${baseURL}/token/`, { username, password });
    return response;
  },
};

export default loginService;
