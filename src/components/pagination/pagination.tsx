import cn from 'classnames';
import { useEffect } from 'react';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, LIMIT_CARD_PER_PAGE, PAGE_STEP } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { changeCurrentPage } from '../../store/app-process/app-process';
import { getCurrentPage } from '../../store/app-process/selectors';
import { getCamerasTotalCount } from '../../store/cameras-data/selectors';
import { getArrayWithFixLength } from '../../utils/utils';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const pageCount = Math.ceil(camerasTotalCount / LIMIT_CARD_PER_PAGE);
  const currentPage = useAppSelector(getCurrentPage);

  useEffect(() => {
    navigate(location?.search || `?_page=${currentPage}`);
  }, [currentPage, location?.search, navigate]);


  const handlerPageClick = (page: number) => {
    dispatch(fetchCamerasAction(page));
    dispatch(changeCurrentPage(page));
  };

  return (
    <div className="pagination" data-testid='pagination'>
      <ul className="pagination__list">
        {currentPage !== DEFAULT_PAGE &&
          <li
            className="pagination__item"
            onClick={() => handlerPageClick(currentPage - PAGE_STEP)}
          >
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: String(currentPage - PAGE_STEP) })}
            >
              Назад
            </Link>
          </li>}

        {getArrayWithFixLength(pageCount).map((page) => {
          const currentPageClassName = cn('pagination__link', {
            'pagination__link--active': currentPage === page
          });

          return (
            <li className="pagination__item" key={page} onClick={() => handlerPageClick(page)}>
              <Link
                className={currentPageClassName}
                to={generatePath(AppRoute.CatalogPage, { page: String(page) })}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {currentPage !== pageCount &&
          <li className="pagination__item" onClick={() => handlerPageClick(currentPage + PAGE_STEP)}>
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: String(currentPage + PAGE_STEP) })}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}
