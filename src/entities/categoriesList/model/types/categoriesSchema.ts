import { ICategory } from 'shared/types/ICategory';

export interface ICategoriesSchema {
  categories: ICategory[];
  errorMessage?: string;
  isLoading: boolean;
}
