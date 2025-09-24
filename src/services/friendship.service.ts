import axios from "axios";


export default class FriendshipService {
    //Adicionar um amigo
    async addFriend(friendId: number, token: string) {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/friends/add-friends`,
                { friendId }, // Envie o ID do amigo no corpo da requisição
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('Erro ao adicionar amigo:', error);
            throw error?.response?.data || { message: 'Erro ao adicionar amigo' };
        }
    }

    //  Busca todos os amigos confirmados
    async getAcceptedFriends(token: string) {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/friends/accepted-friends`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('Erro ao buscar amigos confirmados:', error);
            throw error?.response?.data || { message: 'Erro ao buscar amigos' };
        }
    }

    // Função para buscar as sugestões de amizade do backend
    async getFriendshipSuggestions(token: string) {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/friends/friendship-sugestion`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('Erro ao buscar sugestões de amizade:', error);
            throw error?.response?.data || { message: 'Erro ao buscar sugestões' };
        }
    }

    // Adicione esta nova função para buscar pedidos de amizade pendentes
    async getFriendshipRequests(token: string) {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/friends/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('Erro ao buscar pedidos de amizade:', error);
            throw error?.response?.data || { message: 'Erro ao buscar pedidos' };
        }
    }

    // Função para aceitar um pedido de amizade
    async acceptFriend(friendshipId: number, token: string) {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/friends/accept/${friendshipId}`,
                {}, // Corpo vazio para requisições PATCH/PUT
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('Erro ao aceitar pedido de amizade:', error);
            throw error?.response?.data || { message: 'Erro ao aceitar pedido' };
        }
    }

    // Função para rejeitar um pedido de amizade
    async rejectFriend(friendshipId: number, token: string) {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/friends/reject/${friendshipId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('Erro ao rejeitar pedido de amizade:', error);
            throw error?.response?.data || { message: 'Erro ao rejeitar pedido' };
        }
    }
}