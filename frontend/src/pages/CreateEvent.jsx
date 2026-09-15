
import React, { useState } from 'react';
import api from '../services/api';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoEvento: '',
    tipoEventoCustomizado: '',
    dataEvento: '',
    valorIngresso: '',
    quantidadeMax: 4
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tipoFinal: formData.tipoEvento === 'Outros' ? formData.tipoEventoCustomizado : formData.tipoEvento
    };
    try {
      await api.post('/eventos', payload);
      alert('Evento cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar evento');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Evento - Vendedor</h2>
      
      <input name="titulo" placeholder="Título" onChange={handleChange} onBlur={handleBlur} className={errors.titulo ? 'error-border' : ''} />
      {errors.titulo && <span className="error-text">Obrigatório</span>}
      
      <select name="tipoEvento" onChange={handleChange} onBlur={handleBlur} className={errors.tipoEvento ? 'error-border' : ''}>
        <option value="">Selecione o tipo</option>
        <option value="Show">Show</option>
        <option value="Teatro">Teatro</option>
        <option value="Outros">Outros</option>
      </select>

      {formData.tipoEvento === 'Outros' && (
        <input name="tipoEventoCustomizado" placeholder="Nome do tipo de evento" onChange={handleChange} />
      )}

      <input type="date" name="dataEvento" onChange={handleChange} onBlur={handleBlur} />
      {errors.dataEvento && <span className="error-text">Obrigatório</span>}

      <div className="currency-input">
        <span>R$</span>
        <input type="number" name="valorIngresso" onChange={handleChange} className="no-spinners" />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CreateEvent;