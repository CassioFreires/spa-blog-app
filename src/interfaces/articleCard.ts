import type { IPost } from "./post";

export interface IArticleCardProps {
  post: IPost;
  onReadMore: (id: number) => void;
  disabled?: boolean;
}