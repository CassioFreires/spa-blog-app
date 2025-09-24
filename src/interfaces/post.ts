export type IPost = {
  id?: number;
  title: string;
  subtitle: string;
  content: string;
  categoryId: number;
  user_id: number;
  image_url?: string;
  user_name?: string;
  last_name?:string;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
};
