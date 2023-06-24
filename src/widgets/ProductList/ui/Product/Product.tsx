import image from 'images/item.jpg';
import { FC, useEffect } from 'react';
import NumericInput from 'react-numeric-input';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import getProductById from 'widgets/ProductList/model/services/getProductById';
import s from './Product.module.scss';

type TParams = {
  categoryId: string;
  productId: string;
};

const Product: FC = () => {
  const { productId, categoryId } = useParams<TParams>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((store) => store.product.product);
  const categories = useAppSelector((store) => store.categories.categories);

  const category = categories.find((item) => item.id === Number(categoryId));

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, []);

  return (
    <section className={s.container}>
      <div className={s.flex}>
        <div className={s.imageWrapper}>
          <img src={image} className={s.image} alt='Изображение товара' />
        </div>
        <div className={s.flexColumn}>
          <NumericInput className={s.input} min={0} max={product?.quantity} />
          <button type='button' className={s.button}>Купить</button>
        </div>
      </div>
      <h2 className={s.title}>{product?.title}</h2>
      <h3 className={s.subtitle}>Описание:</h3>
      <p className={s.description}>
        <span className={s.bold}>Цена: </span>
        {product?.price}
      </p>
      <p className={s.description}>
        <span className={s.bold}>Категория: </span>
        {category?.title || 'Без категории'}</p>
      <p className={s.description}>
        <span className={s.bold}>Наличие: </span>
        {product?.quantity}</p>
    </section>
  );
};

export default Product;
