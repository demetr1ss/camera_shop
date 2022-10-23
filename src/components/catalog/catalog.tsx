import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCurrentOrderType, getCurrentPage, getCurrentSortType } from '../../store/app-process/selectors';
import Pagination from '../pagination/pagination';
import CatalogCards from './catalog-cards/catalog-cards';
import CatalogFilters from './catalog-filters/catalog-filters';
import CatalogSort from './catalog-sort/catalog-sort';

export default function Catalog(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = useAppSelector(getCurrentPage);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentOrderType = useAppSelector(getCurrentOrderType);

  useEffect(() => {
    currentSortType || currentOrderType
      ? navigate(location?.search || `?_page=${currentPage}&_sort=${currentSortType}&_order=${currentOrderType}`)
      : navigate(location?.search || `?_page=${currentPage}`);
  }, [currentOrderType, currentPage, currentSortType, location?.search, navigate]);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">
          Каталог фото- и видеотехники
        </h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilters />
          </div>
          <div className="catalog__content">
            <CatalogSort currentSortType={currentSortType} currentOrderType={currentOrderType} />
            <CatalogCards />
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}
