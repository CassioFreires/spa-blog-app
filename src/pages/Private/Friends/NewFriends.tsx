// src/pages/Private/Friends/NewFriendsPage.tsx
import React, { useState, useEffect } from 'react';
import './Friends.css';
import { Link } from 'react-router-dom';
import UserService from '../../../services/users-service';
import type { IUser } from '../../../services/users-service';

interface Friend {
  id: number;
  name: string;
  avatarUrl: string;
  bio: string;
}

const NewFriendsPage = () => {
  const [suggestedFriends, setSuggestedFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userService = new UserService();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); 
        
        if (!token) {
          setError('Você precisa estar logado para ver as sugestões.');
          setLoading(false);
          return;
        }

        const response = await userService.getFriendshipSuggestions(token);

        const formattedSuggestions: Friend[] = response.data.map((user: IUser) => ({
          id: user.id!,
          name: user.name,
          avatarUrl: user.avatarUrl || 'https://i.pravatar.cc/150',
          bio: user.bio || 'Sem biografia',
        }));

        setSuggestedFriends(formattedSuggestions);
      } catch (err: any) {
        setError(err.message || 'Não foi possível carregar as sugestões.');
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  // ✅ FUNÇÃO PARA LIDAR COM O CLIQUE DO BOTÃO
  const handleAddFriend = async (friendId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redireciona para o login ou exibe um erro
        throw new Error('Usuário não autenticado.');
      }

      await userService.addFriend(friendId, token);
      
      // Remove o amigo da lista na tela após o pedido de amizade ser enviado
      setSuggestedFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));

      console.log(`Pedido de amizade enviado com sucesso para o ID: ${friendId}`);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar pedido de amizade.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading-state">Buscando novas amizades...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <div className="friends-page-container">
      <div className="friends-header">
        <h1 className="friends-title">Encontrar novos amigos</h1>
        <p className="friends-subtitle">Veja sugestões de pessoas que você pode conhecer no blog.</p>
        <Link to="/painel/perfil/amigos" className="back-link">
          Voltar para meus amigos
        </Link>
      </div>

      {suggestedFriends.length === 0 ? (
        <div className="no-friends">
          <p>Não há novas sugestões de amizade no momento.</p>
        </div>
      ) : (
        <div className="friends-grid">
          {suggestedFriends.map(friend => (
            <div key={friend.id} className="friend-card">
              <img src={friend.avatarUrl} alt={`Avatar de ${friend.name}`} className="friend-avatar" />
              <h3 className="friend-name">{friend.name}</h3>
              <p className="friend-bio">{friend.bio}</p>
              {/* ✅ BOTÃO AGORA CHAMA A FUNÇÃO CORRETA */}
              <button className="add-friend-btn" onClick={() => handleAddFriend(friend.id)}>
                Adicionar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewFriendsPage;