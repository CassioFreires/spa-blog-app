import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RequireLogin.css';

interface RequireLoginProps {
  message?: string;
  onClose: () => void;  // obrigatório para fechar o modal
}

export default function RequireLogin({ message = 'Você precisa estar logado para acessar essa área.', onClose }: RequireLoginProps) {
  const navigate = useNavigate();

  function handleLoginRedirect() {
    navigate('/login');
  }

  return (
    <div className="require-login-overlay" onClick={onClose}>
      {/* Evita fechar ao clicar no conteúdo */}
      <div className="require-login-container animate-fade-in" onClick={e => e.stopPropagation()}>
        <button 
          className="require-login-close-btn"
          onClick={onClose} 
          aria-label="Fechar"
          title="Fechar"
        >
          &times;
        </button>

        <h2>🚫 Acesso Negado</h2>
        <p>{message}</p>
        <button onClick={handleLoginRedirect} className="btn btn-primary mb-2">
          Fazer Login
        </button>
      </div>
    </div>
  );
}
