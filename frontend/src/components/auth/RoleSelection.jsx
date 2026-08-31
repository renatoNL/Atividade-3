export default function RoleSelection({ setRole, setView }) {
    const handleSelect = (selectedRole) => {
        setRole(selectedRole);
        setView('login');
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Bem-vindo ao IngresseAí! <br/><small style={{fontWeight: 'normal', fontSize: '1.2rem', color: 'var(--accent-color)'}}>Como você deseja acessar?</small></h2>
            <div className="box-container">
                <div className="role-box" onClick={() => handleSelect('COMPRADOR')}>
                    <h3 style={{color: 'var(--accent-color)'}}>Sou Comprador</h3>
                    <p>Acesse o marketplace para explorar eventos e comprar ingressos.</p>
                </div>
                <div className="role-box" onClick={() => handleSelect('VENDEDOR')}>
                    <h3 style={{color: 'var(--accent-color)'}}>Sou Vendedor</h3>
                    <p>Acesse o painel administrativo para cadastrar e gerenciar seus eventos.</p>
                </div>
            </div>
        </div>
    );
}