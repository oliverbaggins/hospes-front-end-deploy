import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hospes-api.onrender.com/api',
});

export default axiosInstance;