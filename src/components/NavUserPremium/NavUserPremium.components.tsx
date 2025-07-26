// components/NavUserPremium.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './NavUserPremium.css';

function NavUserPremium() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const firstName = user?.name?.split(' ')[0] || 'Usuário';
  const initial = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="position-relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="d-flex align-items-center gap-2 text-white user-dropdown-trigger" style={{ cursor: 'pointer' }}>
        <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
          <strong>{initial}</strong>
        </div>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          👋 Olá, <span className="fw-bold text-info">{firstName}</span>
        </motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="dropdown-menu show shadow"
            style={{ display: 'block', position: 'absolute', top: '110%', right: 0 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <li>
              <Link to="/painel/perfil" className="dropdown-item">Meu Painel</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="dropdown-item">Sair</button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavUserPremium;
