import type { ICategory } from "./category";


export interface ICategoryListProps {
  categories: ICategory[];
  iconsMap: Record<string, string>;
}