import { setErrorMessageEvent } from '@entities/categoriesList';
import { $products, getProductsFx } from '@entities/productList';
import { Card } from '@shared/ui/Card';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { useEvent, useStore } from 'effector-react';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import s from './ProductList.module.scss';

type TParams = {
  categoryId: string
};

const ProductList: FC = () => {
  const { categoryId } = useParams<TParams>();
  const { products, error: errorMessage } = useStore($products);
  const navigate = useNavigate();
  const isLoading = useStore(getProductsFx.pending);
  const getProducts = useEvent(getProductsFx);

  useEffect(() => {
    if (categoryId) {
      getProducts(categoryId);
    }
  }, []);

  const productsList = products.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      title={item.title}
      pathname={`/${categoryId}/${item.id}`}
    />
  ));

  const handleClick = () => {
    setErrorMessageEvent('');
    navigate('/', { replace: true });
  };

  if (errorMessage) {
    return <ErrorMessage title="Error" subtitle={errorMessage} onClick={handleClick} />;
  }

  if (products.length === 0 && !isLoading) {
    return <ErrorMessage title='404' subtitle='Такой категории нет' onClick={handleClick} />;
  }

  return (
    <div className={s.container}>
      {productsList}
    </div>
  );
};

export default ProductList;
