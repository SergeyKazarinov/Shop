import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
// import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import Card from 'shared/ui/Card/Card';
import ErrorMessage from 'shared/ui/ErrorMessage/ErrorMessage';
import { $products, getProductsFx } from 'entities/productList/model/productList/productList';
import { useEvent, useStore } from 'effector-react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProducts } from 'entities/productList';
import s from './ProductList.module.scss';

type TParams = {
  categoryId: string
};

const ProductList: FC = () => {
  const { categoryId } = useParams<TParams>();
  // const products = useAppSelector((store) => store.product.products);
  // const errorMessage = useAppSelector((store) => store.product.error);
  // const isLoading = useAppSelector((store) => store.product.isLoading);
  const dispatch = useAppDispatch();
  const { products, error: errorMessage } = useStore($products);
  const isLoading = useStore(getProductsFx.pending);
  const fetchProducts = useEvent(getProductsFx);

  useEffect(() => {
    if (categoryId) {
      dispatch(getProducts(categoryId));
      fetchProducts(categoryId);
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

  if (errorMessage) {
    return <ErrorMessage title="Error" subtitle={errorMessage} />;
  }

  if (products.length === 0 && !isLoading) {
    return <ErrorMessage title='404' subtitle='Такой категории нет' />;
  }

  return (
    <div className={s.container}>
      {productsList}
    </div>
  );
};

export default ProductList;
