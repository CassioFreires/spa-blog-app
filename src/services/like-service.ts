import axios from 'axios';
import type { User } from '../types/User';
import type { Post } from '../interfaces/post-interface';

export interface IReturnResponse<T = any> {
  data?: T;
  message: string;
  error?: any;
}

export interface ICreateLikeDto {
  user_id: number;
  post_id: number;
}

export interface ILike {
  id: number;
  user: User;
  post: Post;
  createdAt: Date;
}



export default class LikeService {
  private baseUrl = "http://localhost:3000/api/likes"; // rota base da API no backend

  // Curtir ou descurtir (toggle)
  async toggle(payload: ICreateLikeDto, token: string): Promise<IReturnResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/toggle`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("[LikeService][toggle]", error);
      throw error.response?.data || error;
    }
  }

  // Quantidade de likes em um post
  async countByPost(post_id: number, token: string): Promise<IReturnResponse<number>> {
    try {
      const response = await axios.get(`${this.baseUrl}/count/${post_id}`, {
        headers: {
          Authorization: `Berear ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.error("[LikeService][countByPost]", error);
      throw error.response?.data || error;
    }
  }

  async countByMultiplePosts(postIds: number[], token: string): Promise<IReturnResponse<Record<number, number>>> {
    try {
      const response = await axios.post(`${this.baseUrl}/count-multiple`, { postIds }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.error("[LikeService][countByMultiplePosts]", error);
      throw error.response?.data || error;
    }
  }

  // Buscar todos os likes
  async getAll(): Promise<IReturnResponse<ILike[]>> {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error: any) {
      console.error("[LikeService][getAll]", error);
      throw error.response?.data || error;
    }
  }

  // Buscar like por ID
  async getById(id: number): Promise<IReturnResponse<ILike>> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("[LikeService][getById]", error);
      throw error.response?.data || error;
    }
  }

  // Deletar um like específico
  async delete(id: number, token: string): Promise<IReturnResponse> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("[LikeService][delete]", error);
      throw error.response?.data || error;
    }
  }
}
