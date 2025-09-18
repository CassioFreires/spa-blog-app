export interface Post {
  userLiked: boolean;
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  author?: string;
  category?: string;
  category_name: string;
  category_description?: string;
  createAt: Date | string;
  updatAt?: Date | string;
  user_name?: string;
  image_url?: string;
}