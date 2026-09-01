import React, { useState } from 'react';

const PasswordInput = ({ value, onChange, name, placeholder, onBlur, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-wrapper">
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
      />
      <button 
        type="button" 
        onClick={() => setShowPassword(!showPassword)}
        className="toggle-password-btn"
      >
        {showPassword ? 'Ocultar' : 'Visualizar'}
      </button>
      {error && <span className="error-text">Este campo é obrigatório.</span>}
    </div>
  );
};

export default PasswordInput;