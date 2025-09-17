import axios from 'axios';

export type IUser = {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
};

export default class UserService {

    // Buscar todos os usuários
    async getAll() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
            return response.data;
        } catch (error: any) {
            console.error('Erro ao buscar usuários:', error);
            throw error?.response?.data || { message: 'Erro ao buscar usuários' };
        }
    }

    // Buscar usuário por ID
    async getById(id: string | number) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error?.response?.data || { message: 'Erro ao buscar usuário' };
        }
    }

    // Criar um novo usuário
    async create(user: IUser) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, user);
            return response.data;
        } catch (error: any) {
            console.error('Erro ao criar usuário:', error);
            throw error?.response?.data || { message: 'Erro ao criar usuário' };
        }
    }

    // Atualizar usuário
    async update(id: string | number, user: Partial<IUser>, token: string) {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/users/${id}`,
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // <--- aqui
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('Erro ao atualizar usuário:', error);
            throw error?.response?.data || { message: 'Erro ao atualizar usuário' };
        }
    }
    // Deletar usuário
    async delete(id: string | number) {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Erro ao deletar usuário:', error);
            throw error?.response?.data || { message: 'Erro ao deletar usuário' };
        }
    }

    // Buscar usuário por email (opcional, se a API tiver endpoint)
    async getByEmail(email: string) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/byemail/${email}`);
            return response.data;
        } catch (error: any) {
            console.error('Erro ao buscar usuário por email:', error);
            throw error?.response?.data || { message: 'Erro ao buscar usuário por email' };
        }
    }
}
