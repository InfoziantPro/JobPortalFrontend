import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://edutech-api-dev.onrender.com/api', // Your backend URL here
  withCredentials: true, // to allow cookies to be sent
});

export default apiClient;
