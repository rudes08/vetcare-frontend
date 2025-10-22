// src/api/vetcareApi.js
import axios from 'axios';

const vetcareApi = axios.create({
    baseURL: 'https://vetcare-plus-api.onrender.com/api' // ¡Usa tu URL de Render!
});

// Interceptor para incluir el token en todas las peticiones
vetcareApi.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default vetcareApi;