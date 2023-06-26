import { ICategory } from 'shared/types/ICategory';

export interface ICategoriesSchema {
  categories: ICategory[];
  error?: string;
  isLoading: boolean;
}
