import axios from 'axios';

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
  private url = 'http://localhost:3000';

  async getAll(page: number, limit: number = 6) {
    try {
      const response = await axios.get(`${this.url}/api/posts`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getById(id: string | number) {
    try {
      const response = await axios.get(`${this.url}/api/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async getTop() {
    try {
      const response = await axios.get(`${this.url}/api/posts/top`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }




  async create(post: Post) {
    try {
      const response = await axios.post(`${this.url}/api/posts`, post);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error?.response?.data || { message: 'Erro ao criar o post' };
    }
  }

  async update(id: string | number, post: Partial<Post>) {
    try {
      const response = await axios.patch(`${this.url}/api/posts/${id}`, post);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error?.response?.data || { message: 'Erro ao atualizar o post' };
    }
  }

  async delete(id: string | number) {
    try {
      const response = await axios.delete(`${this.url}/api/posts/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error?.response?.data || { message: 'Erro ao deletar o post' };
    }
  }

  async getPostsByCategories(slug: string) {
    try {
      const response = await axios.get(`${this.url}/api/posts/bycategories/${slug}`);
      return response;
    } catch (error: any) {
      throw error?.response?.data || { message: 'Erro ao buscar posts por categorias' };
    }
  }

  async getAllPostsByUser(token: string) {
    try {
      const response = await axios.get(`${this.url}/api/posts/allpostsbyuser`, {
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

  async updatePostByUser(token: string, post: Partial<Post>) {
    try {
      const response = await axios.patch(`${this.url}/api/posts/updatepostbyuser`, post, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error: any) {
      throw error?.response?.data || { message: 'Erro ao tentar atualizar post do usuário' };
    }
  }

  async deletPostByUser(token: string, idPost: number) {
    try {
      const response = await axios.delete(`${this.url}/api/posts/deletepostbyuser/${idPost}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error: any) {
      throw error?.response?.data || { message: 'Erro ao tentar deletar post do usuário' };
    }
  }
}
