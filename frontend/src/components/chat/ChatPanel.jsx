import { useState } from 'react';
import { conversarAPI } from '../../services/api';

export default function ChatPanel() {
    const [mensagem, setMensagem] = useState('');
    const [resposta, setResposta] = useState('Pergunte sobre eventos, ingressos ou como usar a plataforma.');
    const [carregando, setCarregando] = useState(false);

    const enviar = async (evento) => {
        evento.preventDefault();
        if (!mensagem.trim() || carregando) return;
        setCarregando(true);
        try {
            const resultado = await conversarAPI(mensagem.trim());
            setResposta(resultado.resposta);
            setMensagem('');
        } catch (error) {
            setResposta(error.response?.data?.mensagem || 'Não foi possível consultar o assistente.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <aside className="chat-panel">
            <span className="eyebrow">Assistente</span>
            <h2>Chat IngresseAí</h2>
            <p className="chat-answer">{resposta}</p>
            <form onSubmit={enviar} className="chat-form">
                <input className="input-field" value={mensagem} onChange={evento => setMensagem(evento.target.value)} placeholder="Digite sua dúvida" maxLength="1000" />
                <button className="btn" type="submit" disabled={carregando}>{carregando ? 'Consultando...' : 'Enviar'}</button>
            </form>
        </aside>
    );
}