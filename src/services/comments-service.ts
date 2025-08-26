import axios from "axios";

// Tipagem para os dados de comentário, com base na sua interface de backend
export interface IComment {
    replies: boolean;
    id: number;
    content: string;
    user_id: number;
    user_name: string;
    post_id: number;
    post_title: string;
    createAt: string;
    updateAt: string;
}

// Tipagem para os DTOs (Data Transfer Objects)
export interface ICreateCommentDto {
    content: string;
    user_id: number;
    post_id: number;
}

export interface IUpdateCommentDto {
    content: string;
}

export default class CommentService {
    // URL base para o endpoint de comentários
    private baseUrl = 'http://localhost:3000/api/comments';

    // Busca todos os comentários de um post específico
    async getAllByPostId(postId: number) {
        try {
            // O endpoint foi inferido com base na sua função de backend 'getAllCommentsByPost'
            const response = await axios.get(`${this.baseUrl}/post/${postId}`);
            return response.data;
        } catch (error: any) {
            console.error("Erro ao buscar comentários:", error);
            throw error?.response?.data || { message: "Erro ao buscar comentários" };
        }
    }

    // Cria um novo comentário
    async create(data: ICreateCommentDto, token: string) {
        try {
            const response = await axios.post(this.baseUrl, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            console.error("Erro ao criar comentário:", error);
            throw error?.response?.data || { message: "Erro ao criar comentário" };
        }
    }

    // Atualiza um comentário por ID
    async update(commentId: number, data: IUpdateCommentDto, token:string) {
        try {
            const response = await axios.patch(`${this.baseUrl}/${commentId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            console.error(`Erro ao atualizar comentário ${commentId}:`, error);
            throw error?.response?.data || { message: "Erro ao atualizar comentário" };
        }
    }

    // Deleta um comentário por ID
    async delete(commentId: number, token:string) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            console.error(`Erro ao deletar comentário ${commentId}:`, error);
            throw error?.response?.data || { message: "Erro ao deletar comentário" };
        }
    }
}