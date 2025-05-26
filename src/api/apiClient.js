import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL here
  withCredentials: true, // to allow cookies to be sent
});

export default apiClient;
