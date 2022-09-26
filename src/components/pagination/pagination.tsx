import cn from 'classnames';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, LIMIT_CARD_PER_PAGE, PAGE_STEP } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { changePage } from '../../store/app-process/app-process';
import { getCurrentPage } from '../../store/app-process/selectors';
import { getCamerasTotalCount } from '../../store/cameras-data/selectors';

export default function Pagination() {
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);

  const pageCount = Math.ceil(camerasTotalCount / LIMIT_CARD_PER_PAGE);

  const handlePageButtonClick = (page: number) => {
    if (page === currentPage) {
      return;
    }

    dispatch(fetchCamerasAction(String(page)));
    dispatch(changePage(page));
  };

  const nextPageClassName = cn('pagination__item', {
    'visually-hidden': currentPage === pageCount
  });

  const previousPageClassName = cn('pagination__item', {
    'visually-hidden': currentPage === DEFAULT_PAGE
  });

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className={previousPageClassName} onClick={() => handlePageButtonClick(currentPage - PAGE_STEP)}>
          <Link className="pagination__link pagination__link--text" to={generatePath(AppRoute.CatalogPage, { page: String(currentPage - PAGE_STEP)})}>
            Назад
          </Link>
        </li>

        {Array.from({ length: pageCount }, (_, page) => {
          const currentPageClassName = cn('pagination__link', {
            'pagination__link--active': currentPage === page + PAGE_STEP
          });

          return (
            <li className="pagination__item" key={page + PAGE_STEP} onClick={() => handlePageButtonClick(page + PAGE_STEP)}>
              <Link
                className={currentPageClassName}
                to={generatePath(AppRoute.CatalogPage, { page: String(page + PAGE_STEP) })}
              >
                {page + 1}
              </Link>
            </li>
          );
        })}
        <li className={nextPageClassName} onClick={() => handlePageButtonClick(currentPage + PAGE_STEP)}>
          <Link className="pagination__link pagination__link--text" to={generatePath(AppRoute.CatalogPage, { page: String(currentPage + PAGE_STEP)})}>
            Далее
          </Link>
        </li>
      </ul>
    </div>
  );
}
