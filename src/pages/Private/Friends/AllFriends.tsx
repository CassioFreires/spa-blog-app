// src/pages/Private/Friends/AllFriendsPage.tsx
import React, { useState, useEffect } from 'react';
import './Friends.css';
import { Link } from 'react-router-dom';
import UserService from '../../../services/users-service';
import type { IUser } from '../../../services/users-service';

// Defina a interface para o amigo, baseada na interface do usuário
interface Friend {
  id: number;
  name: string;
  avatarUrl: string; // Nota: A propriedade no backend é avatarUrl
  bio: string;
}

const ITEMS_PER_PAGE = 12;

const AllFriendsPage = () => {
  const [friends, setFriends] = useState<Friend[]>([]); // Tipo corrigido para Friend[]
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const userService = new UserService();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Você precisa estar logado para ver seus amigos.');
          setLoading(false);
          return;
        }

        // ✅ FAZ A CHAMADA PARA A FUNÇÃO REAL DO SERVIÇO
        const response = await userService.getAcceptedFriends(token);

        // Mapeia a resposta da API para o seu tipo Friend
        const formattedFriends: Friend[] = response.data.map((user: IUser) => ({
          id: user.id!,
          name: user.name,
          avatarUrl: user.avatarUrl || 'https://i.pravatar.cc/150',
          bio: user.bio || 'Sem biografia',
        }));

        setFriends(formattedFriends);
      } catch (err: any) {
        setError(err.message || 'Não foi possível carregar a lista de amigos.');
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []); // A chamada à API é feita apenas uma vez ao carregar o componente

  // A lógica de paginação continua a mesma, mas agora usa os dados reais do estado `friends`
  const totalPages = Math.ceil(friends.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFriends = friends.slice(startIndex, endIndex);

  if (loading) {
    return <div className="loading-state">Carregando todos os amigos...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <div className="friends-page-container">
      <div className="friends-header">
        <h1 className="friends-title">Todos os seus amigos</h1>
        <p className="friends-subtitle">Gerencie e explore sua lista completa de conexões.</p>
        <Link to="/painel/perfil/amigos/sugestoes" className="find-friends-link">
          Encontrar novos amigos
        </Link>
      </div>

      {currentFriends.length === 0 ? (
        <div className="no-friends">
          <p>Você ainda não tem amigos adicionados.</p>
        </div>
      ) : (
        <>
          <div className="friends-grid">
            {currentFriends.map(friend => (
              <div key={friend.id} className="friend-card">
                <img
                  src={friend.avatarUrl || "https://i.pravatar.cc/150"}
                  alt={`Avatar de ${friend.name}`}
                  className="friend-avatar"
                />
                <h3 className="friend-name">{friend.name}</h3>
                <p className="friend-bio">{friend.bio}</p>

                <Link className="visit-profile-btn" to={`/painel/perfil/${friend.id}`}>
                  Ver Perfil
                </Link>
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllFriendsPage;