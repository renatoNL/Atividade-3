import { useState, useEffect } from 'react';
import { criarEventoAPI, listarEventosAPI } from '../../services/api';

export default function AdminPanel() {
    const [eventos, setEventos] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('FUTEBOL');
    const [preco, setPreco] = useState('');
    const [qtd, setQtd] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        listarEventosAPI().then(setEventos).catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        try {
            const novoEvento = await criarEventoAPI({ descricao, tipo, preco: parseFloat(preco), ingressosDisponiveis: parseInt(qtd) });
            setEventos([novoEvento, ...eventos]);
            setDescricao(''); setPreco(''); setQtd('');
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
                
                <input className="input-field" style={{ flex: 2, minWidth: '250px' }} placeholder="Descrição (Ex: Festival de Música)" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                <select className="input-field" style={{ flex: 1, minWidth: '150px' }} value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="FUTEBOL">Jogo de Futebol</option>
                    <option value="SHOW">Show / Festival</option>
                    <option value="TEATRO">Teatro / Arte</option>
                </select>
                <input className="input-field" style={{ flex: 1, minWidth: '120px' }} type="number" step="0.01" min="0.01" placeholder="Valor Ingresso" value={preco} onChange={e => setPreco(e.target.value)} required />
                <input className="input-field" style={{ flex: 1, minWidth: '120px' }} type="number" min="1" placeholder="Carga Qtd" value={qtd} onChange={e => setQtd(e.target.value)} required />
                <button className="btn" type="submit" style={{ flex: 1, minWidth: '150px' }}>Cadastrar Evento</button>
            </form>

            <h3 style={{ marginTop: '3rem' }}>Seus Eventos Ativos</h3>
            <div className="grid-container">
                {eventos.map(ev => (
                    <div key={ev.id} className="card" style={{borderLeft: '4px solid var(--accent-color)'}}>
                        <h4 style={{ margin: 0 }}>{ev.descricao}</h4>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Categoria:</strong> {ev.tipo}</p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Disponíveis:</strong> {ev.ingressosDisponiveis}</p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Valor Un.:</strong> R$ {ev.preco.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}