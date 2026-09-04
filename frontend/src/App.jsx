import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RoleSelection from './components/RoleSelection';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AdminPanel from './components/AdminPanel';
import Marketplace from './components/Marketplace';
import Cart from './components/Cart';

function App() {
  const [view, setView] = useState('roleSelection');
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    setUser(null);
    setView('roleSelection');
    localStorage.removeItem('token');
  };

  const renderView = () => {
    switch (view) {
      case 'roleSelection':
        return <RoleSelection setView={setView} />;
      case 'login':
        return <LoginForm setView={setView} setUser={setUser} />;
      case 'register':
        return <RegisterForm setView={setView} />;
      case 'admin':
        return <AdminPanel />;
      case 'marketplace':
        return <Marketplace />;
      case 'cart':
        return <Cart />;
      default:
        return <RoleSelection setView={setView} />;
    }
  };

  return (
    <div>
      <Navbar 
        view={view} 
        setView={setView} 
        user={user} 
        onLogout={handleLogout} 
        cartCount={cartCount} 
      />
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;