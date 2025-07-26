import axios from 'axios';
import type { IPost } from '../../interfaces/Post/IPost.interface';
import type { IReturnListResponse } from '../../interfaces/Post/IApiResponse.interface';

export default class PostService {
  private baseUrl = 'http://localhost:3000/api';

  async getTop(): Promise<IPost[]> {
    const res = await axios.get(`${this.baseUrl}/post/top`);
    if (!res.data || !res.data.posts || !res.data.posts.data) {
      throw new Error("Estrutura da resposta inválida em getTop");
    }
    return res.data.posts.data;
  }


  async getAll(page: number = 1): Promise<IReturnListResponse> {
    const res = await axios.get(`${this.baseUrl}/post?page=${page}`);

    if (
      !res.data ||
      !res.data.posts?.data ||
      !res.data.posts?.pagination
    ) {
      throw new Error("Resposta inválida do servidor");
    }

    return {
      message: res.data.message,
      data: res.data.posts.data,
      pagination: res.data.posts.pagination, // 👈 aqui estava o erro
    };
  }



  async getById(id: number): Promise<IPost> {
    const res = await axios.get(`${this.baseUrl}/post/${id}`);
    if (!res.data || !res.data.post || !res.data.post.data) {
      throw new Error("Estrutura da resposta inválida em getById");
    }
    return res.data.post.data;
  }
}
