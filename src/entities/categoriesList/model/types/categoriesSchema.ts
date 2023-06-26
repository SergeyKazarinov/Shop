import { ICategory } from '@shared/types';

export interface ICategoriesSchema {
  categories: ICategory[];
  errorMessage?: string;
  isLoading: boolean;
}
