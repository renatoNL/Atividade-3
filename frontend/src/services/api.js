import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const criarEventoAPI = (dados) => api.post('/eventos', dados);
export const listarEventosAPI = () => api.get('/eventos');
export const comprarIngressoAPI = (dados) => api.post('/comprador/ingressos/comprar', dados);
export const listarMeusIngressosAPI = () => api.get('/comprador/ingressos');

export default api;