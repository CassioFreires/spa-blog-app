import axios from 'axios';
import type { IPost } from '../interfaces/post';

export type Post = {
  id?: number;
  title: string;
  subtitle: string;
  content: string;
  categoryId: number;
  user_id: number;
  image?: string;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default class PostService {

  async getAll(page: number, limit: number = 6, query: string = '', category: string = '', sort: string = '') {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          params: {
            page,
            limit,
            q: query || undefined, // só manda se existir
            category: category || undefined, // Agora envia o filtro de categoria
            sort: sort || undefined, // Agora envia o parâmetro de ordenação
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      throw error;
    }
  }

  async getById(id: string | number) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async getTop() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/top`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }




  async create(post: Post) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, post);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error?.response?.data || { message: 'Erro ao criar o post' };
    }
  }

  async update(id: string | number, post: Partial<Post>) {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, post);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error?.response?.data || { message: 'Erro ao atualizar o post' };
    }
  }

  async delete(id: string | number) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error?.response?.data || { message: 'Erro ao deletar o post' };
    }
  }

  async getPostsByCategories(slug: string) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/bycategories/${slug}`);
      return response;
    } catch (error: any) {
      throw error?.response?.data || { message: 'Erro ao buscar posts por categorias' };
    }
  }

  async getAllPostsByUser(token: string) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/allpostsbyuser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Retorna apenas a parte de dados da resposta
      return response.data;
    } catch (error: any) {
      throw error?.response?.data || { message: 'Erro ao buscar todos os posts do usuário' };
    }
  }

  async updatePostByUser(token: string, id: string, data: FormData | Partial<Post>) {
    try {
      const isFormData = data instanceof FormData;

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/posts/updatepostbyuser/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error?.response?.data || { message: "Erro ao tentar atualizar post do usuário" };
    }
  }

  async deletPostByUser(token: string, idPost: number) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/deletepostbyuser/${idPost}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error: any) {
      throw error?.response?.data || { message: 'Erro ao tentar deletar post do usuário' };
    }
  }

  async createPostByUser(token: string, post: Partial<IPost>) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/createpostbyuser`, post, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error: any) {
      throw error?.response?.data || { message: 'Erro ao tentar deletar post do usuário' };
    }
  }
  // Dentro do PostService
  async createPostByUserFormData(token: string, formData: FormData) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/createpostbyuser`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // importante para upload
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('[PostService][createPostByUserFormData]', error);
      throw error.response?.data || error;
    }
  }
}