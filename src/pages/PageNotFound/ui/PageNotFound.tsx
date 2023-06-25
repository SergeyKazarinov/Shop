import NotFound, { SizeTitleEnum } from 'shared/ui/NotFound/NotFound';
import s from './PageNotFound.module.scss';

const PageNotFound = () => (
  <section className={s.pageNotFound}>
    <NotFound title='404' subtitle='Страница не найдена' sizeTitle={SizeTitleEnum.LARGE} />
  </section>
);

export default PageNotFound;
