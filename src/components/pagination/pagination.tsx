import cn from 'classnames';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, LIMIT_CARD_PER_PAGE, PAGE_STEP } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { changeCurrentPage } from '../../store/app-process/app-process';
import { getCurrentOrderType, getCurrentPage, getCurrentSortType } from '../../store/app-process/selectors';
import { getCamerasTotalCount } from '../../store/cameras-data/selectors';
import { getArrayWithFixLength } from '../../utils/utils';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const pageCount = Math.ceil(camerasTotalCount / LIMIT_CARD_PER_PAGE);
  const currentPage = useAppSelector(getCurrentPage);
  const sortType = useAppSelector(getCurrentSortType);
  const orderType = useAppSelector(getCurrentOrderType);

  const handlerPageClick = (page: number) => {
    if (page !== currentPage) {
      dispatch(fetchCamerasAction({ page, sortType, orderType }));
      dispatch(changeCurrentPage(page));
    }
  };

  return (
    <div className="pagination" data-testid='pagination'>
      <ul className="pagination__list">
        {currentPage !== DEFAULT_PAGE &&
          <li
            className="pagination__item"
          >
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: String(currentPage - PAGE_STEP) })}
              onClick={() => handlerPageClick(currentPage - PAGE_STEP)}
            >
              Назад
            </Link>
          </li>}

        {getArrayWithFixLength(pageCount).map((page) => {
          const currentPageClassName = cn('pagination__link', {
            'pagination__link--active': currentPage === page
          });

          return (
            <li className="pagination__item" key={page}>
              <Link
                className={currentPageClassName}
                to={generatePath(AppRoute.CatalogPage, { page: String(page) })}
                onClick={() => handlerPageClick(page)}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {currentPage !== pageCount &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: String(currentPage + PAGE_STEP) })}
              onClick={() => handlerPageClick(currentPage + PAGE_STEP)}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}
