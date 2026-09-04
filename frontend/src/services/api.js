import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
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
export const comprarIngressoAPI = (id, dados) => api.post(`/eventos/${id}/comprar`, dados);
export const listarMeusIngressosAPI = () => api.get('/comprador/meus-ingressos');

export default api;