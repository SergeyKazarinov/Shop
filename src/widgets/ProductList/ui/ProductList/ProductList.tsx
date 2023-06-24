import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import Card from 'shared/ui/Card/Card';
import getProducts from 'widgets/ProductList/model/services/getProducts';
import s from './ProductList.module.scss';

type TParams = {
  categoryId: string
};

const ProductList: FC = () => {
  const { categoryId } = useParams<TParams>();
  const products = useAppSelector((store) => store.product.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoryId) {
      dispatch(getProducts(categoryId));
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

  return (
    <section className={s.container}>
      {productsList}
    </section>
  );
};

export default ProductList;
