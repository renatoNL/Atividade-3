import { comprarIngressoAPI } from '../../services/api';

export default function Cart({ cart, setCart, user, setView }) {
    const total = cart.reduce((acc, item) => acc + (item.evento.valorIngresso * item.quantidade), 0);

    const handleCheckout = async () => {
        if (cart.length === 0) return alert('Carrinho vazio.');
        try {
            for (const item of cart) {
                for (let i = 0; i < item.quantidade; i++) {
                    await comprarIngressoAPI({ ingressoId: item.evento.ingressoId, quantidade: item.quantidade });
                }
            }
            alert('Compra finalizada com sucesso! Seus ingressos estão garantidos.');
            setCart([]);
            setView('marketplace');
        } catch (error) {
            alert(`Erro na compra: ${error.mensagem || error.message}`);
        }
    };

    const handleRemove = (eventoId) => {
        setCart(cart.filter(item => item.evento.id !== eventoId));
    };

    return (
        <div>
            <h2 style={{borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem'}}>Carrinho de Compras</h2>
            {cart.length === 0 ? (
                <p style={{textAlign: 'center', marginTop: '3rem'}}>Seu carrinho está vazio. Volte ao Marketplace para explorar eventos.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                    {cart.map((item, idx) => (
                        <div key={idx} className="card" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{margin: '0 0 0.5rem 0', color: 'var(--accent-color)'}}>{item.evento.titulo}</h3>
                                <p style={{margin: 0}}>{item.quantidade}x R$ {item.evento.valorIngresso.toFixed(2)} = <strong>R$ {(item.evento.valorIngresso * item.quantidade).toFixed(2)}</strong></p>
                            </div>
                            <button className="btn outline" style={{borderColor: 'var(--danger-color)', color: 'var(--danger-color)'}} onClick={() => handleRemove(item.evento.id)}>Remover</button>
                        </div>
                    ))}
                    <div style={{ textAlign: 'right', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <h2 style={{color: 'var(--accent-color)'}}>Total: R$ {total.toFixed(2)}</h2>
                        <button className="btn" style={{ padding: '1rem 3rem', fontSize: '1.2rem', marginTop: '1rem' }} onClick={handleCheckout}>Concluir Compra Segura</button>
                    </div>
                </div>
            )}
        </div>
    );
}