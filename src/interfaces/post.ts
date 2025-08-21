export interface IPost {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  category_id:number;
  image?: string;
  user_name?: string;
  last_name?:string;
  createAt?: string;
}