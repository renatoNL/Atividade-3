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

export const criarEventoAPI = async (dados) => (await api.post('/admin/eventos', dados)).data;
export const listarEventosAPI = async () => (await api.get('/eventos')).data;
export const comprarIngressoAPI = async (dados) => (await api.post('/comprador/ingressos/comprar', dados)).data;
export const listarMeusIngressosAPI = async () => (await api.get('/comprador/ingressos')).data;
export const autenticarAPI = async (dados) => (await api.post('/api/auth/login', dados)).data;
export const cadastrarAPI = async (dados) => (await api.post('/api/auth/register', dados)).data;
export const conversarAPI = async (mensagem) => (await api.post('/chat', { mensagem })).data;

export default api;