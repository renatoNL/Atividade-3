import { useState, useEffect } from 'react';
import { criarEventoAPI, listarEventosAPI } from '../../services/api';

export default function AdminPanel() {
    const [eventos, setEventos] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipoEvento, setTipoEvento] = useState('FUTEBOL');
    const [valorIngresso, setValorIngresso] = useState('');
    const [qtd, setQtd] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        listarEventosAPI().then(setEventos).catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        try {
            const novoEvento = await criarEventoAPI({ titulo, descricao, tipoEvento, dataEvento: new Date().toISOString().slice(0, 19), valorIngresso: parseFloat(valorIngresso), quantidadeIngressos: parseInt(qtd) });
            setEventos([novoEvento, ...eventos]);
            setTitulo(''); setDescricao(''); setValorIngresso(''); setQtd('');
            alert('Evento cadastrado e pronto para vendas!');
        } catch (error) {
            setErro(error.mensagem || 'Erro interno ao cadastrar evento.');
        }
    };

    return (
        <div>
            <h2 style={{borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem'}}>Painel do Produtor de Eventos</h2>
            
            <form className="auth-form" style={{ maxWidth: '100%', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: '2rem' }} onSubmit={handleSubmit}>
                <h3 style={{ width: '100%', margin: '0 0 1rem 0' }}>Cadastrar Novo Lote/Evento</h3>
                {erro && <p style={{ width: '100%', color: 'white', backgroundColor: 'var(--danger-color)', padding: '0.5rem', borderRadius: '4px' }}>{erro}</p>}
                
                <input className="input-field" style={{ flex: 2, minWidth: '250px' }} placeholder="Título do evento" value={titulo} onChange={e => setTitulo(e.target.value)} required />
                <input className="input-field" style={{ flex: 2, minWidth: '250px' }} placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                <select className="input-field" style={{ flex: 1, minWidth: '150px' }} value={tipoEvento} onChange={e => setTipoEvento(e.target.value)}>
                    <option value="FUTEBOL">Jogo de Futebol</option>
                    <option value="SHOW">Show / Festival</option>
                    <option value="TEATRO">Teatro / Arte</option>
                </select>
                <input className="input-field" style={{ flex: 1, minWidth: '120px' }} type="number" step="0.01" min="0.01" placeholder="Valor Ingresso" value={valorIngresso} onChange={e => setValorIngresso(e.target.value)} required />
                <input className="input-field" style={{ flex: 1, minWidth: '120px' }} type="number" min="1" placeholder="Carga Qtd" value={qtd} onChange={e => setQtd(e.target.value)} required />
                <button className="btn" type="submit" style={{ flex: 1, minWidth: '150px' }}>Cadastrar Evento</button>
            </form>

            <h3 style={{ marginTop: '3rem' }}>Seus Eventos Ativos</h3>
            <div className="grid-container">
                {eventos.map(ev => (
                    <div key={ev.id} className="card" style={{borderLeft: '4px solid var(--accent-color)'}}>
                        <h4 style={{ margin: 0 }}>{ev.titulo}</h4>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{ev.descricao}</p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Categoria:</strong> {ev.tipoEvento}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}