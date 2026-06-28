import axios from 'axios';

// Instància d'axios amb la URL base de l'API Laravel
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Ajusta segons el teu port de docker
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor per adjuntar el token Bearer en cada petició
api.interceptors.request.use((config) => {
    // Recuperem el token del localStorage (on l'hauràs guardat en fer login)
    const token = localStorage.getItem('auth_token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;