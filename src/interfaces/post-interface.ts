export interface Post {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  author?: string;
  category?: string;
  category_name: string;
  category_description?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  user_name?: string;
  imageUrl?: string;
}