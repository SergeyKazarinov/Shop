import { FC } from 'react';
import { Link } from 'react-router-dom';
import image from 'images/item.jpg';
import s from './Card.module.scss';

interface CardProps {
  id: number;
  title: string;
  category_id?: number;
  pathname: string;
}

const Card: FC<CardProps> = ({ title, pathname }) => (
  <Link to={pathname} className={s.link}>
    <img src={image} className={s.image} alt='изображение ноутбука' />
    <h3 className={s.title}>{title}</h3>
  </Link>
);

export default Card;
