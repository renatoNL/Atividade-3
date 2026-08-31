export const API_URL = 'http://localhost:8081';

export const criarEventoAPI = async (evento) => {
    const res = await fetch(`${API_URL}/admin/eventos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evento)
    });
    if (!res.ok) throw await res.json();
    return res.json();
};

export const comprarIngressoAPI = async (eventoId, compradorId) => {
    const res = await fetch(`${API_URL}/comprador/ingressos/comprar?eventoId=${eventoId}&compradorId=${compradorId}`, { method: 'POST' });
    if (!res.ok) throw await res.json();
    return res.json();
};

export const listarEventosAPI = async () => {
    const res = await fetch(`${API_URL}/admin/eventos`);
    if (!res.ok) throw await res.json();
    return res.json();
};

export const listarMeusIngressosAPI = async (compradorId) => {
    const res = await fetch(`${API_URL}/comprador/ingressos/${compradorId}`);
    if (!res.ok) throw await res.json();
    return res.json();
};

export const cancelarIngressoAPI = async (ingressoId) => {
    const res = await fetch(`${API_URL}/comprador/ingressos/${ingressoId}/cancelar`, { method: 'POST' });
    if (!res.ok) throw await res.json();
};