import { FC } from 'react';
import Card from 'shared/ui/Card/Card';
import ErrorMessage from 'shared/ui/ErrorMessage/ErrorMessage';
import { $categories, getCategoriesFx } from 'entities/categoriesList';
import { useStore } from 'effector-react';
import s from './CategoriesList.module.scss';

const CategoriesList: FC = () => {
  const { categories, errorMessage } = useStore($categories);
  const isLoading = useStore(getCategoriesFx.pending);

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
