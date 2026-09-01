import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MyTickets = () => {
  const [ingressos, setIngressos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngressos = async () => {
      try {
        const response = await api.get('/comprador/meus-ingressos');
        setIngressos(response.data);
      } catch (error) {
        console.error('Erro ao buscar ingressos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngressos();
  }, []);

  if (loading) return <p>Carregando ingressos...</p>;

  return (
    <div className="my-tickets-container">
      <h2>Meus Ingressos</h2>
      {ingressos.length === 0 ? (
        <p>Você ainda não possui ingressos comprados.</p>
      ) : (
        <div className="tickets-grid">
          {ingressos.map((ingresso) => (
            <div key={ingresso.id} className="ticket-card">
              <h3>{ingresso.evento.titulo}</h3>
              <p>Data: {new Date(ingresso.evento.dataEvento).toLocaleDateString('pt-BR')}</p>
              <p>Quantidade: {ingresso.quantidade}</p>
              <p>Total pago: R$ {parseFloat(ingresso.valorTotal).toFixed(2)}</p>
              <span className="ticket-status">Confirmado</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;