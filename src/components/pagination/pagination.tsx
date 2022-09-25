import cn from 'classnames';
import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, LIMIT_CARD_PER_PAGE } from '../../const/const';
import { useAppDispatch } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';

type PaginationPropsType = {
  camerasTotalCount: number;
}

export default function Pagination({camerasTotalCount}: PaginationPropsType) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(camerasTotalCount / LIMIT_CARD_PER_PAGE);

  const handlePageButtonClick = (page: number) => {
    if (page === currentPage) {
      return;
    }

    dispatch(fetchCamerasAction(String(page)));
    setCurrentPage(page);
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
        <li className={previousPageClassName} onClick={() => handlePageButtonClick(currentPage - 1)}>
          <Link className="pagination__link pagination__link--text" to="/">
            Назад
          </Link>
        </li>

        {Array.from({ length: pageCount }, (_, page) => {
          const currentPageClassName = cn('pagination__link', {
            'pagination__link--active': currentPage === page + 1
          });

          return (
            <li className="pagination__item" key={page + 1} onClick={() => handlePageButtonClick(page + 1)}>
              <Link
                className={currentPageClassName}
                to={generatePath(AppRoute.CatalogPage, { page: String(page + 1) })}
              >
                {page + 1}
              </Link>
            </li>
          );
        })}
        <li className={nextPageClassName} onClick={() => handlePageButtonClick(currentPage + 1)}>
          <Link className="pagination__link pagination__link--text" to="/">
            Далее
          </Link>
        </li>
      </ul>
    </div>
  );
}
