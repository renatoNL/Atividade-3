import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import './index.css';

const formatCurrency = (value) => {
  if (!value) return '';
  const numericValue = value.replace(/\D/g, '');
  if (!numericValue) return '';
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(numericValue) / 100);
  return `R$ ${formatted}`;
};

const formatCpfCnpjAlpha = (value) => {
  const clean = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  if (clean.length <= 11) {
    return clean
      .replace(/^([a-zA-Z0-9]{3})([a-zA-Z0-9])/, '$1.$2')
      .replace(/^([a-zA-Z0-9]{3})\.([a-zA-Z0-9]{3})([a-zA-Z0-9])/, '$1.$2.$3')
      .replace(/^([a-zA-Z0-9]{3})\.([a-zA-Z0-9]{3})\.([a-zA-Z0-9]{3})([a-zA-Z0-9]{1,2})$/, '$1.$2.$3-$4');
  }
  return clean
    .replace(/^([a-zA-Z0-9]{2})([a-zA-Z0-9])/, '$1.$2')
    .replace(/^([a-zA-Z0-9]{2})\.([a-zA-Z0-9]{3})([a-zA-Z0-9])/, '$1.$2.$3')
    .replace(/^([a-zA-Z0-9]{2})\.([a-zA-Z0-9]{3})\.([a-zA-Z0-9]{3})([a-zA-Z0-9])/, '$1.$2.$3/$4')
    .replace(/^([a-zA-Z0-9]{2})\.([a-zA-Z0-9]{3})\.([a-zA-Z0-9]{3})\/([a-zA-Z0-9]{4})([a-zA-Z0-9]{1,2})$/, '$1.$2.$3/$4-$5');
};

const Formulario = () => {
  useEffect(() => {
    document.title = "IngresseAí";
  }, []);

  const [formData, setFormData] = useState({ nome: '', descricao: '', documento: '', valor: '', quantidade: '' });
  const [errors, setErrors] = useState({ nome: false, descricao: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'documento') formattedValue = formatCpfCnpjAlpha(value);
    if (name === 'valor') formattedValue = formatCurrency(value);

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if ((name === 'nome' || name === 'descricao') && value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'nome' || name === 'descricao') {
      setErrors(prev => ({ ...prev, [name]: value.trim() === '' }));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastro - IngresseAí</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Nome:</label><br/>
        <input 
          type="text" 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          onBlur={handleBlur}
          className={errors.nome ? 'input-error' : ''} 
        />
        {errors.nome && <span className="error-msg">Nome é obrigatório</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Descrição:</label><br/>
        <input 
          type="text" 
          name="descricao" 
          value={formData.descricao} 
          onChange={handleChange} 
          onBlur={handleBlur}
          className={errors.descricao ? 'input-error' : ''} 
        />
        {errors.descricao && <span className="error-msg">Descrição é obrigatória</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>CPF/CNPJ (Alfanumérico):</label><br/>
        <input 
          type="text" 
          name="documento" 
          value={formData.documento} 
          onChange={handleChange} 
          maxLength="18" 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Valor (R$):</label><br/>
        <input 
          type="text" 
          name="valor" 
          value={formData.valor} 
          onChange={handleChange} 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Quantidade (Input Numérico sem setas):</label><br/>
        <input 
          type="number" 
          name="quantidade" 
          value={formData.quantidade}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const ListaPaginada = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginaAtual = Number(searchParams.get("page")) || 1;
  const totalPaginas = 10;

  useEffect(() => {
    document.title = "IngresseAí - Lista";
  }, []);

  const setPage = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Ingressos</h2>
      <p>Exibindo conteúdo da página {paginaAtual}</p>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setPage(paginaAtual - 1)} 
          disabled={paginaAtual <= 1}
        >
          Anterior
        </button>
        
        <span>Página {paginaAtual} de {totalPaginas}</span>
        
        <button 
          onClick={() => setPage(paginaAtual + 1)} 
          disabled={paginaAtual >= totalPaginas}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Formulário</Link>
        <Link to="/lista">Lista (Paginação)</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/lista" element={<ListaPaginada />} />
      </Routes>
    </Router>
  );
}