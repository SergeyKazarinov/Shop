import { $categories, getCategoriesFx, setErrorMessageEvent } from '@entities/categoriesList';
import { Card } from '@shared/ui/Card';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { useStore } from 'effector-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './CategoriesList.module.scss';

const CategoriesList: FC = () => {
  const { categories, errorMessage } = useStore($categories);
  const isLoading = useStore(getCategoriesFx.pending);
  const navigate = useNavigate();

  const categoriesList = categories.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      title={item.title}
      pathname={`/${item.id}`}
    />
  ));

  const handleClick = () => {
    setErrorMessageEvent('');
    navigate('/', { replace: true });
  };

  if (errorMessage && !isLoading) {
    return <ErrorMessage title='Error' subtitle={errorMessage} onClick={handleClick} />;
  }

  return (
    <div className={s.container}>
      {categoriesList}
    </div>
  );
};

export default CategoriesList;
