import { $categories } from '@entities/categoriesList';
import { $products } from '@entities/productList';
import { getPathArrayFromLocation } from '@shared/lib/getPathArrayFromLocation';
import { useStore } from 'effector-react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: FC = () => {
  const { pathname } = useLocation();
  const pathArray = getPathArrayFromLocation(pathname);

  const { categories } = useStore($categories);
  const { product } = useStore($products);

  let crumb: string | undefined;
  let isCategory = false;

  const breadcrumbs = pathArray.map((item, index) => {
    const routeTo = `/${pathArray.slice(0, index + 1).join('/')}`;

    if (index === 0) {
      const hasCategory = categories.find((el) => el.id === Number(item));
      if (hasCategory) {
        crumb = hasCategory.title;
        isCategory = true;
      }
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
    <div>
      {crumb && isCategory && breadcrumbs}
    </div>
  );
};

export default Breadcrumbs;
