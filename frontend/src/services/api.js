import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      window.location.href = '/erro?tipo=network';
    } else if (error.response.status === 429) {
      window.location.href = '/erro?tipo=rate_limit';
    } else if (error.response.status >= 500) {
      window.location.href = '/erro?tipo=fatal';
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;