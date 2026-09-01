import React from 'react';
import { useSearchParams } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const tipoErro = searchParams.get('tipo');

  const mensagens = {
    network: 'Falha na conexão. Verifique sua internet.',
    rate_limit: 'Muitas requisições. Tente novamente mais tarde.',
    fatal: 'Erro interno no servidor. Nossa equipe já foi notificada.',
    default: 'Ocorreu um erro inesperado.',
  };

  return (
    <div className="error-container">
      <h1>Ops, algo deu errado!</h1>
      <p>{mensagens[tipoErro] || mensagens.default}</p>
      <button onClick={() => window.location.href = '/'}>Voltar ao Início</button>
    </div>
  );
};

export default ErrorPage;