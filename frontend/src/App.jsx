import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import RoleSelection from './components/auth/RoleSelection';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AdminPanel from './components/marketplace/AdminPanel';
import Marketplace from './components/marketplace/Marketplace';
import Cart from './components/marketplace/Cart';
import ChatPanel from './components/chat/ChatPanel';

function App() {
  const [view, setView] = useState('role-selection');
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    setUser(null);
    setView('role-selection');
    localStorage.removeItem('token');
  };

  const renderView = () => {
    switch (view) {
      case 'role-selection':
        return <RoleSelection setRole={setRole} setView={setView} />;
      case 'login':
        return <LoginForm role={role} setView={setView} onLogin={setUser} />;
      case 'register':
        return <RegisterForm role={role} setView={setView} />;
      case 'admin':
        return <AdminPanel />;
      case 'marketplace':
        return <Marketplace cart={cart} setCart={setCart} />;
      case 'cart':
        return <Cart cart={cart} setCart={setCart} user={user} setView={setView} />;
      default:
        return <RoleSelection setRole={setRole} setView={setView} />;
    }
  };

  return (
    <div>
      <Navbar
        view={view} 
        setView={setView} 
        user={user} 
        onLogout={handleLogout} 
        cartCount={cart.length}
      />
      <main>
        {renderView()}
        {user && <ChatPanel />}
      </main>
    </div>
  );
}

export default App;