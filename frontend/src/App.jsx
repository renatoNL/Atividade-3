import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import RoleSelection from './components/auth/RoleSelection';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Marketplace from './components/marketplace/Marketplace';
import Cart from './components/marketplace/Cart';
import AdminPanel from './components/marketplace/AdminPanel';

export default function App() {
    const [theme, setTheme] = useState('dark');
    const [view, setView] = useState('role-selection');
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-mode' : '';
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const handleLogin = (userData) => {
        setUser(userData);
        setView(userData.role === 'VENDEDOR' ? 'admin' : 'marketplace');
    };

    const handleLogout = () => {
        setUser(null);
        setRole(null);
        setCart([]);
        setView('role-selection');
    };

    return (
        <div>
            <Navbar 
                theme={theme} 
                toggleTheme={toggleTheme} 
                user={user} 
                onLogout={handleLogout} 
                view={view}
                setView={setView}
                cartCount={cart.reduce((acc, item) => acc + item.quantidade, 0)}
            />
            
            <main className="container">
                {view === 'role-selection' && <RoleSelection setRole={setRole} setView={setView} />}
                {view === 'login' && <LoginForm role={role} setView={setView} onLogin={handleLogin} />}
                {view === 'register' && <RegisterForm role={role} setView={setView} />}
                {view === 'marketplace' && <Marketplace cart={cart} setCart={setCart} />}
                {view === 'cart' && <Cart cart={cart} setCart={setCart} user={user} setView={setView} />}
                {view === 'admin' && <AdminPanel />}
            </main>
        </div>
    );
}