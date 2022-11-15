import cn from 'classnames';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute, BREADCRUMBS_POX_X, DEFAULT_PAGE, PAGE_STEP} from '../../const/const';
import {useAppSelector} from '../../hooks';
import {getCurrentCatalogPath} from '../../store/app-process/selectors';
import {getArrayWithFixLength} from '../../utils/utils';

type PaginationPropsType = {
  pagesCount: number;
}

export default function Pagination({pagesCount}: PaginationPropsType) {
  const {currentPage, search} = useAppSelector(getCurrentCatalogPath);
  const onClickLinkHandler = () => {
    window.scrollTo({
      top: BREADCRUMBS_POX_X,
    });
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
              to={{
                pathname: generatePath(AppRoute.CatalogPage, {page: String(currentPage - PAGE_STEP)}),
                search
              }}
              onClick={onClickLinkHandler}
            >
              Назад
            </Link>
          </li>}

        {getArrayWithFixLength(pagesCount).map((page) => {
          const currentPageClassName = cn('pagination__link', {
            'pagination__link--active': currentPage === page
          });

          return (
            <li className="pagination__item" key={page}>
              <Link
                className={currentPageClassName}
                to={{
                  pathname: generatePath(AppRoute.CatalogPage, {page: String(page)}),
                  search
                }}
                onClick={onClickLinkHandler}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {currentPage !== pagesCount &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={{
                pathname: generatePath(AppRoute.CatalogPage, {page: String(currentPage + PAGE_STEP)}),
                search
              }}
              onClick={onClickLinkHandler}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}
