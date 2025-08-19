import axios from "axios";
import type { ICategory } from "../interfaces/category";

export default class CategoriesService {
  private baseUrl = 'http://localhost:3000/api/categories';

  // Pega todas as categorias com paginação
  async getAll(page?: number, limit?: number) {
    try {
      const response = await axios.get(this.baseUrl, { params: { page, limit } });
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
      throw error?.response?.data || { message: "Erro ao buscar categorias" };
    }
  }

  // Pega categoria por ID
  async getById(id: string | number) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar categoria ${id}:`, error);
      throw error?.response?.data || { message: "Erro ao buscar categoria" };
    }
  }

  // Cria uma nova categoria
  async create(category: ICategory) {
    try {
      const response = await axios.post(this.baseUrl, category);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar categoria:", error);
      throw error?.response?.data || { message: "Erro ao criar categoria" };
    }
  }

  // Atualiza categoria
  async update(id: string | number, category: Partial<ICategory>) {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, category);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao atualizar categoria ${id}:`, error);
      throw error?.response?.data || { message: "Erro ao atualizar categoria" };
    }
  }

  // Deleta categoria
  async delete(id: string | number) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao deletar categoria ${id}:`, error);
      throw error?.response?.data || { message: "Erro ao deletar categoria" };
    }
  }
}