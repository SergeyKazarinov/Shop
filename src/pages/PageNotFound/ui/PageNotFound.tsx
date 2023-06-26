import { ErrorMessage, SizeTitleEnum } from 'shared/ui/ErrorMessage';
import s from './PageNotFound.module.scss';

const PageNotFound = () => (
  <section className={s.pageNotFound}>
    <ErrorMessage title='404' subtitle='Страница не найдена' sizeTitle={SizeTitleEnum.LARGE} />
  </section>
);

export default PageNotFound;
