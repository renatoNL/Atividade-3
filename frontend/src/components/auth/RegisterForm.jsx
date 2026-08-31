import { useState } from 'react';
import { validaCPF, validaCNPJ, validaIdade, validaSenha, validaEmail } from '../../utils/validators';

export default function RegisterForm({ role, setView }) {
    const [form, setForm] = useState({
        nome: '',
        documento: '',
        email: '',
        senha: '',
        sexo: '',
        nascimento: '',
        termos: false
    });
    const [erros, setErros] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        setErros(prev => ({ ...prev, [name]: '' })); 
    };

    const handleBlur = (field) => {
        let erro = '';
        if (field === 'documento') {
            if (role === 'COMPRADOR' && !validaCPF(form.documento)) erro = 'CPF inválido.';
            if (role === 'VENDEDOR' && !validaCNPJ(form.documento)) erro = 'CNPJ inválido.';
        }
        if (field === 'email' && !validaEmail(form.email)) erro = 'E-mail inválido.';
        if (field === 'senha' && !validaSenha(form.senha)) erro = 'A senha deve ter no mínimo 6 caracteres, 1 maiúscula e 1 minúscula.';
        if (field === 'nascimento' && role === 'COMPRADOR' && !validaIdade(form.nascimento)) erro = 'Você deve ser maior de 18 anos.';
        
        if (erro) setErros(prev => ({ ...prev, [field]: erro }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar tudo antes do envio
        handleBlur('documento');
        handleBlur('email');
        handleBlur('senha');
        handleBlur('nascimento');

        if (Object.values(erros).some(e => e !== '') || !form.termos) {
            alert('Preencha todos os campos corretamente e aceite os termos.');
            return;
        }

        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        setView('login');
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 style={{ margin: 0, textAlign: 'center', color: 'var(--accent-color)' }}>
                Cadastro - {role === 'COMPRADOR' ? 'Comprador' : 'Vendedor'}
            </h2>
            
            <div className="input-group">
                <input className={`input-field ${erros.nome ? 'error' : ''}`} type="text" name="nome" placeholder={role === 'COMPRADOR' ? 'Nome Completo' : 'Razão Social'} value={form.nome} onChange={handleChange} required minLength="3" maxLength="100"/>
            </div>

            <div className="input-group">
                <input className={`input-field ${erros.documento ? 'error' : ''}`} type="text" name="documento" placeholder={role === 'COMPRADOR' ? 'CPF (Apenas números)' : 'CNPJ (Apenas números)'} value={form.documento} onChange={handleChange} onBlur={() => handleBlur('documento')} required maxLength={role === 'COMPRADOR' ? 11 : 14}/>
                {erros.documento && <p className="error-text">{erros.documento}</p>}
            </div>

            <div className="input-group">
                <input className={`input-field ${erros.email ? 'error' : ''}`} type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} onBlur={() => handleBlur('email')} required />
                {erros.email && <p className="error-text">{erros.email}</p>}
            </div>

            {role === 'COMPRADOR' && (
                <>
                    <div className="input-group">
                        <select className="input-field" name="sexo" value={form.sexo} onChange={handleChange} required>
                            <option value="" disabled>Selecione o Sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                            <option value="Prefiro nao informar">Prefiro não informar</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.9rem' }}>Data de Nascimento:</label>
                        <input className={`input-field ${erros.nascimento ? 'error' : ''}`} type="date" name="nascimento" value={form.nascimento} onChange={handleChange} onBlur={() => handleBlur('nascimento')} required />
                        {erros.nascimento && <p className="error-text">{erros.nascimento}</p>}
                    </div>
                </>
            )}

            <div className="input-group">
                <input className={`input-field ${erros.senha ? 'error' : ''}`} type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} onBlur={() => handleBlur('senha')} required />
                {erros.senha && <p className="error-text">{erros.senha}</p>}
            </div>

            <div className="checkbox-group">
                <input type="checkbox" name="termos" id="termos" checked={form.termos} onChange={handleChange} required />
                <label htmlFor="termos">Aceito os termos de uso e política de privacidade</label>
            </div>

            <button className="btn" type="submit" disabled={!form.termos}>Cadastrar</button>
            <p style={{ textAlign: 'center', margin: 0, cursor: 'pointer', color: 'var(--accent-color)' }} onClick={() => setView('login')}>
                Já tem conta? Faça Login
            </p>
        </form>
    );
}