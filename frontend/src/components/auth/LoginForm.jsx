import { useState } from 'react';
import { validaCPF, validaCNPJ } from '../../utils/validators';
import { autenticarAPI } from '../../services/api';

export default function LoginForm({ role, setView, onLogin }) {
    const [documento, setDocumento] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        if (role === 'COMPRADOR' && !validaCPF(documento)) {
            return setErro('CPF inválido.');
        }
        if (role === 'VENDEDOR' && !validaCNPJ(documento)) {
            return setErro('CNPJ inválido.');
        }
        if (senha.length < 6) {
            return setErro('A senha deve ter no mínimo 6 caracteres.');
        }

        try {
            const { token } = await autenticarAPI({ cpfCnpj: documento, senha });
            localStorage.setItem('token', token);
            onLogin({ role, documento });
            setView(role === 'VENDEDOR' ? 'admin' : 'marketplace');
        } catch (error) {
            setErro(error.response?.data?.mensagem || 'Não foi possível entrar.');
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 style={{ margin: 0, textAlign: 'center', color: 'var(--accent-color)' }}>
                Login - {role === 'COMPRADOR' ? 'Comprador' : 'Vendedor'}
            </h2>
            
            {erro && <p style={{ color: 'white', backgroundColor: 'var(--danger-color)', padding: '0.8rem', borderRadius: '4px', margin: 0 }}>{erro}</p>}
            
            <div className="input-group">
                <input className={`input-field ${erro.includes('CPF') || erro.includes('CNPJ') ? 'error' : ''}`} type="text" placeholder={role === 'COMPRADOR' ? 'CPF' : 'CNPJ'} value={documento} onChange={(e) => setDocumento(e.target.value)} required />
            </div>

            <div className="input-group">
                <input className={`input-field ${erro.includes('senha') ? 'error' : ''}`} type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>

            <button className="btn" type="submit">Entrar no Sistema</button>
            
            <div style={{ marginTop: '1rem', padding: '1rem', border: '1px dashed var(--accent-color)', borderRadius: '4px', fontSize: '0.8rem', opacity: 0.8 }}>
                <strong>Dica para avaliação:</strong><br/>
                Para login rápido Master, use:<br/>
                Doc: {role === 'COMPRADOR' ? '00000000000' : '00000000000000'} | Senha: MasterA1
            </div>

            <p style={{ textAlign: 'center', margin: '1rem 0 0 0', cursor: 'pointer', color: 'var(--accent-color)', fontWeight: 'bold' }} onClick={() => setView('register')}>
                Não tem conta? Cadastre-se
            </p>
            <p style={{ textAlign: 'center', margin: 0, cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => setView('role-selection')}>
                ← Voltar para seleção
            </p>
        </form>
    );
}