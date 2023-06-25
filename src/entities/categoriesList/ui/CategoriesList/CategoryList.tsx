import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import Card from 'shared/ui/Card/Card';
import ErrorMessage from 'shared/ui/ErrorMessage/ErrorMessage';
import s from './CategoriesList.module.scss';

interface CategoriesListProps {

}

const CategoriesList: FC<CategoriesListProps> = () => {
  const categories = useAppSelector((store) => store.categories.categories);
  const errorMessage = useAppSelector((store) => store.categories.error);
  const isLoading = useAppSelector((store) => store.categories.isLoading);

  const categoriesList = categories.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      title={item.title}
      pathname={`/${item.id}`}
    />
  ));

  if (errorMessage && !isLoading) {
    return <ErrorMessage title='Error' subtitle={errorMessage} />;
  }

  return (
    <div className={s.container}>
      {categoriesList}
    </div>
  );
};

export default CategoriesList;
