import React, { useState, useEffect } from 'react';
import './Friends.css';
import { Link } from 'react-router-dom';
import type { IUser } from '../../../services/users-service';
import FriendshipService from '../../../services/friendship.service';
import UserService from '../../../services/users-service';

interface Friend {
  id: number;
  name: string;
  avatarUrl: string;
  bio: string;
}

const ITEMS_PER_PAGE = 12;

const AllFriendsPage = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [suggestions, setSuggestions] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputFilter, setInputFilter] = useState('');
  const [filterType, setFilterType] = useState('Todos');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [filteredResults, setFilteredResults] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<number[]>([]);


  const friendshipService = new FriendshipService();
  const usersService = new UserService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');
        const currentUser = userJson ? JSON.parse(userJson) : null;
        const currentId = currentUser?.id;

        if (!token || !currentId) {
          setError('Você precisa estar logado.');
          setLoading(false);
          return;
        }

        setCurrentUserId(currentId);

        const [friendsRes, allUsersRes] = await Promise.all([
          friendshipService.getAcceptedFriends(token),
          usersService.getAll(),
        ]);

        console.log(friendsRes)

        const allUsers: Friend[] = allUsersRes.data.map((user: IUser) => ({
          id: user.id!,
          name: user.name,
          avatarUrl: user.avatarUrl || 'https://i.pravatar.cc/150',
          bio: user.bio || 'Sem biografia',
        }));

        const friendsList: Friend[] = friendsRes.data.map((user: IUser) => ({
          id: user.id!,
          name: user.name,
          avatarUrl: user.avatarUrl || 'https://i.pravatar.cc/150',
          bio: user.bio || 'Sem biografia',
        }));

        const suggestionsList = allUsers.filter(
          user =>
            user.id !== currentId &&
            !friendsList.some(friend => friend.id === user.id)
        );

        setFriends(friendsList);
        setSuggestions(suggestionsList);
        setFilteredResults([]);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddFriend = async (friendId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Usuário não autenticado.');
      }

      await friendshipService.addFriend(friendId, token);

      // Atualiza a lista de sugestões
      setSuggestions(prev => prev.filter(user => user.id !== friendId));
      setFilteredResults(prev => prev.filter(user => user.id !== friendId));

      // Armazena no estado que a solicitação foi enviada
      setPendingRequests(prev => [...prev, friendId]);
    } catch (err: any) {
      setError(err.message || 'Erro ao adicionar amigo.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputFilter(value);

    if (value.trim() === '') {
      setFilteredResults([]);
      setError(null);
      return;
    }

    let sourceList: Friend[] = [];

    switch (filterType) {
      case 'Amigos':
        sourceList = friends;
        break;
      case 'Sugestoes':
        sourceList = suggestions;
        break;
      default:
        sourceList = [...friends, ...suggestions];
        break;
    }

    const matches = sourceList.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );

    if (matches.length === 0) {
      setError('Nenhum usuário encontrado.');
    } else {
      setError(null);
    }

    setFilteredResults(matches);
  };

  const totalPages = Math.ceil(friends.length / ITEMS_PER_PAGE);
  const currentFriends = friends.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const usersToRender =
    inputFilter.length > 0
      ? filteredResults
      : filterType === 'Sugestoes'
        ? suggestions
        : currentFriends;

  if (loading) {
    return <div className="loading-state">Carregando...</div>;
  }

  return (
    <div className="friends-page-container">
      {/* Filtros */}
      <div className="friends-filter-header mb-5">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          value={inputFilter}
          onChange={handleInputChange}
        />
        <select
          className="friends-filter-select"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setInputFilter('');
            setFilteredResults([]);
            setError(null);
          }}
        >
          <option disabled value="Escolha">Escolha o filtro</option>
          <option value="Todos">Todos</option>
          <option value="Amigos">Amigos</option>
          <option value="Sugestoes">Sugestões</option>
        </select>
      </div>

      {/* Cabeçalho */}
      <div className="friends-header">
        <h1 className="friends-title">Todos os seus amigos</h1>
        <p className="friends-subtitle">Gerencie e explore sua lista de conexões.</p>
        <Link to="/painel/perfil/amigos/sugestoes" className="find-friends-link">
          Encontrar novos amigos
        </Link>
      </div>

      {/* Erro de busca */}
      {error && inputFilter.length > 0 && (
        <div className="error-state">
          <p>{error}</p>
        </div>
      )}

      {/* Lista */}
      {usersToRender.length === 0 && !error ? (
        <div className="no-friends">
          <p>Nenhum usuário para mostrar.</p>
        </div>
      ) : (
        <>
          <div className="friends-grid">
            {usersToRender.map(user => (
              <div key={user.id} className="friend-card">
                <img
                  src={user.avatarUrl}
                  alt={`Avatar de ${user.name}`}
                  className="friend-avatar"
                />
                <h3 className="friend-name">{user.name}</h3>
                <p className="friend-bio">{user.bio}</p>

                {friends.some(f => f.id === user.id) ? (
                  <Link className="visit-profile-btn" to={`/painel/perfil/${user.id}`}>
                    Ver Perfil
                  </Link>
                ) : pendingRequests.includes(user.id) ? (
                  <button className="request-sent-btn" disabled>
                    Solicitação enviada
                  </button>
                ) : (
                  <button
                    className="add-friend-btn"
                    onClick={() => handleAddFriend(user.id)}
                  >
                    Adicionar
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Paginação (apenas quando não filtrando nem vendo sugestões) */}
          {inputFilter.length === 0 && filterType !== 'Sugestoes' && (
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
          )}
        </>
      )}
    </div>
  );
};

export default AllFriendsPage;
