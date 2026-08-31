export default function Navbar({ theme, toggleTheme, user, onLogout, view, setView, cartCount }) {
    return (
        <header className="navbar">
            <h1 style={{ cursor: 'pointer', margin: 0 }} onClick={() => user ? setView(user.role === 'VENDEDOR' ? 'admin' : 'marketplace') : setView('role-selection')}>
                IngresseAí
            </h1>
            <div className="nav-actions">
                <button className="btn outline" onClick={toggleTheme} style={{ padding: '0.5rem 1rem' }}>
                    {theme === 'dark' ? '☀ Claro' : '🌙 Escuro'}
                </button>
                {user && user.role === 'COMPRADOR' && (
                    <button className="btn" onClick={() => setView('cart')} style={{ padding: '0.5rem 1rem' }}>
                        🛒 Carrinho ({cartCount})
                    </button>
                )}
                {user && (
                    <button className="btn danger" onClick={onLogout} style={{ padding: '0.5rem 1rem' }}>
                        Sair
                    </button>
                )}
            </div>
        </header>
    );
}