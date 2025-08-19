export interface IArticle {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  category?: string;
  user_name: string;
  createAt: string;
  updatedAt?: string;
}