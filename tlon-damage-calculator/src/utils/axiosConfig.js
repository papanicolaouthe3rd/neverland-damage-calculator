import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://178.128.193.238:7001'
});

export default axiosInstance;