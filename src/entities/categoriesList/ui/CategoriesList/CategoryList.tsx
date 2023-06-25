import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import Card from 'shared/ui/Card/Card';
import s from './CategoriesList.module.scss';

interface CategoriesListProps {

}

const CategoriesList: FC<CategoriesListProps> = () => {
  const categories = useAppSelector((store) => store.categories.categories);

  const categoriesList = categories.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      title={item.title}
      pathname={`/${item.id}`}
    />
  ));

  return (
    <div className={s.container}>
      {categoriesList}
    </div>
  );
};

export default CategoriesList;
