import type { IPost } from "./IPost.interface";

export interface IReturnListResponse {
  message: string;
  data: IPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
  };
}


