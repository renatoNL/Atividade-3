import { useEffect, useState } from 'react';
import { listarEventosAPI } from '../../services/api';

export default function Marketplace({ cart, setCart }) {
    const [eventos, setEventos] = useState([]);
    const [quantidades, setQuantidades] = useState({});

    useEffect(() => {
        listarEventosAPI().then(setEventos).catch(console.error);
    }, []);

    const handleAddToCart = (evento) => {
        const qtd = parseInt(quantidades[evento.id] || 1);
        if (qtd <= 0 || qtd > evento.ingressosDisponiveis) return alert('Quantidade selecionada indisponível.');

        const existingItem = cart.find(item => item.evento.id === evento.id);
        if (existingItem) {
            setCart(cart.map(item => item.evento.id === evento.id ? { ...item, quantidade: item.quantidade + qtd } : item));
        } else {
            setCart([...cart, { evento, quantidade: qtd }]);
        }
        alert(`Ingresso(s) para "${evento.descricao}" adicionado(s) ao carrinho!`);
    };

    return (
        <div>
            <h2 style={{borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem'}}>Ingressos em Destaque</h2>
            <div className="grid-container" style={{ marginTop: '2rem' }}>
                {eventos.map(ev => (
                    <div key={ev.id} className="card">
                        <h3 style={{ margin: 0, color: 'var(--accent-color)' }}>{ev.descricao}</h3>
                        <p style={{ margin: '0.5rem 0' }}><strong>Categoria:</strong> {ev.tipo}</p>
                        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}><strong>R$ {ev.preco.toFixed(2)}</strong></p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: ev.ingressosDisponiveis > 10 ? 'var(--accent-color)' : 'var(--danger-color)' }}>
                            Disponíveis: {ev.ingressosDisponiveis}
                        </p>
                        <div className="card-actions">
                            <input 
                                className="input-field" 
                                type="number" 
                                min="1" 
                                max={ev.ingressosDisponiveis}
                                value={quantidades[ev.id] || 1} 
                                onChange={(e) => setQuantidades({...quantidades, [ev.id]: e.target.value})}
                                style={{ width: '80px', padding: '0.5rem' }}
                            />
                            <button className="btn" style={{ flex: 1, padding: '0.5rem' }} onClick={() => handleAddToCart(ev)}>Adicionar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}