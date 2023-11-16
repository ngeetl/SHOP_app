import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? '' : 'http://localhost:4000'
});

axiosInstance.interceptors.request.use(function(config) {
    // config는 HTTP 요청의 설정을 나타냄
    config.headers.Authorization = 'Baerer ' + localStorage.getItem('accessToken');
    return config
}, function(error) {
    return Promise.reject(error);
});

export default axiosInstance;