import React from 'react';

const EventCard = ({ evento }) => {
  return (
    <div className="event-card">
      <div className="event-flag">
        {evento.tipoEvento === 'Outros' ? evento.tipoEventoCustomizado : evento.tipoEvento}
      </div>
      <h3>{evento.titulo}</h3>
      <p>{evento.descricao}</p>
      <p className="event-date">Data: {new Date(evento.dataEvento).toLocaleDateString('pt-BR')}</p>
      <p className="event-price">R$ {parseFloat(evento.valorIngresso).toFixed(2)}</p>
      <button>Comprar Ingressos</button>
    </div>
  );
};

export default EventCard;