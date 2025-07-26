import type { IUser } from "../User/IUser.interface";

export interface IPost {
  id: number;            // id adicionado para key e link
  title: string;
  subtitle: string;
  content: string;
  createdAt: Date;
  updatAt: Date;
  data: IUser;
}