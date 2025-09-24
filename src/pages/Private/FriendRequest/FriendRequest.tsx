import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FriendshipService from '../../../services/friendship.service';
import './FriendRequest.css';
import UserService from '../../../services/users-service'; // Importar UserService para a interface IUser

// Defina a interface para o pedido de amizade
interface FriendshipRequest {
  id: number;
  name: string;
  avatarUrl: string;
  bio: string;
  friendshipId: number;
}

const FriendRequestsPage = () => {
  const [requests, setRequests] = useState<FriendshipRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const friendshipService = new FriendshipService();

  // Função para buscar os pedidos de amizade pendentes
  const fetchFriendRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Você precisa estar logado para ver os pedidos.');
        setLoading(false);
        return;
      }

      const response = await friendshipService.getFriendshipRequests(token);

      const formattedRequests: FriendshipRequest[] = response.data.map((request: any) => ({
        id: request.id,
        name: request.name,
        avatarUrl: request.avatarUrl || request.image_url || 'https://i.pravatar.cc/150',
        bio: request.bio || 'Sem biografia',
        friendshipId: request.friendshipId,
      }));

      setRequests(formattedRequests);
    } catch (err: any) {
      console.error('Erro ao buscar pedidos de amizade:', err);
      setError(err.message || 'Não foi possível carregar os pedidos de amizade.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  // Função para aceitar o pedido
  const handleAcceptRequest = async (friendshipId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Usuário não autenticado.');

      await friendshipService.acceptFriend(friendshipId, token);
      
      // Remove o pedido aceito da lista na tela
      setRequests(prevRequests => prevRequests.filter(req => req.friendshipId !== friendshipId));
      
      console.log(`Pedido de amizade aceito para o ID: ${friendshipId}`);
    } catch (err: any) {
      setError(err.message || 'Erro ao aceitar pedido de amizade.');
      console.error(err);
    }
  };

  // Função para rejeitar o pedido
  const handleRejectRequest = async (friendshipId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Usuário não autenticado.');

      await friendshipService.rejectFriend(friendshipId, token);

      // Remove o pedido rejeitado da lista na tela
      setRequests(prevRequests => prevRequests.filter(req => req.friendshipId !== friendshipId));
      
      console.log(`Pedido de amizade rejeitado para o ID: ${friendshipId}`);
    } catch (err: any) {
      setError(err.message || 'Erro ao rejeitar pedido de amizade.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="minimal-loading">Carregando pedidos de amizade...</div>;
  }

  if (error) {
    return <div className="minimal-error">{error}</div>;
  }

  return (
    <div className="minimal-page-container">
      <div className="minimal-header">
        <h1 className="minimal-title">Pedidos de amizade</h1>
        <p className="minimal-subtitle">Gerencie os convites recebidos.</p>
        <Link to="/painel/perfil/amigos" className="minimal-link">
          Voltar para meus amigos
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="empty-state-container">
          <p className="empty-state-icon">💌</p>
          <p className="empty-state-text">
            Nenhuma nova solicitação de amizade no momento. <br />
            Compartilhe seu perfil para que as pessoas te encontrem!
          </p>
          <Link to="/painel/perfil" className="empty-state-link">
            Compartilhar meu perfil
          </Link>
        </div>
      ) : (
        <div className="minimal-card-grid">
          {requests.map(request => (
            <div key={request.friendshipId} className="minimal-card">
              <img src={request.avatarUrl} alt={`Avatar de ${request.name}`} className="minimal-avatar" />
              <h3 className="minimal-name">{request.name}</h3>
              <p className="minimal-bio">{request.bio}</p>

              <div className="minimal-actions">
                <button 
                  className="btn-accept" 
                  onClick={() => handleAcceptRequest(request.friendshipId)}
                >
                  Aceitar
                </button>
                <button 
                  className="btn-reject" 
                  onClick={() => handleRejectRequest(request.friendshipId)}
                >
                  Rejeitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequestsPage;