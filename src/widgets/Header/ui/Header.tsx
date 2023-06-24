import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPathArrayFromLocation } from 'shared/lib/helpers/getPathArrayFromLocation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import s from './Header.module.scss';

const Header: FC = () => {
  const { pathname } = useLocation();
  const categories = useAppSelector((store) => store.categories.categories);
  const product = useAppSelector((store) => store.product.product);
  const pathArray = getPathArrayFromLocation(pathname);

  let crumb: string | undefined;

  const breadcrumbs = pathArray.map((item, index) => {
    const routeTo = `/${pathArray.slice(0, index + 1).join('/')}`;

    if (index === 0) {
      crumb = categories.find((el) => el.id === Number(item))?.title;
    }

    if (index === 1) {
      crumb = product?.title;
    }

    const isLast = index === pathArray.length - 1;

    return isLast
      ? (<span key={index}>{` / ${crumb}`}</span>)
      : (
        <span key={index}>
          <span>/ </span>
          <Link to={routeTo} >{crumb}</Link>
        </span>
      );
  });

  return (
    <header className={s.header}>
      <div className={s.flex}>
        <h1 className={s.title}>{crumb}</h1>
      </div>
      <div className={s.breadCrumbs}>
        {crumb && breadcrumbs}
      </div>
    </header>
  );
};

export default Header;
