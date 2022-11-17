import {generatePath, Link} from 'react-router-dom';
import {AppRoute, DEFAULT_PAGE} from '../../const/const';
import {useAppSelector} from '../../hooks';
import {getCurrentCatalogPath} from '../../store/app-process/selectors';

type BreadcrumbsPropsType = {
  pageName?: string;
}

export default function Breadcrumbs({pageName}: BreadcrumbsPropsType): JSX.Element {
  const {currentPage, search} = useAppSelector(getCurrentCatalogPath);

  return (
    <div className="breadcrumbs" data-testid="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link
              className="breadcrumbs__link"
              to={{
                pathname: generatePath(AppRoute.CatalogPage, {
                  page: currentPage ? String(currentPage) : String(DEFAULT_PAGE)
                }),
                search
              }}
            >
              Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            {pageName ?
              <Link
                className="breadcrumbs__link"
                to={{
                  pathname: generatePath(AppRoute.CatalogPage, {
                    page: currentPage ? String(currentPage) : String(DEFAULT_PAGE)
                  }),
                  search
                }}
                data-testid="bread-link"
              >
                Каталог
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link> :
              <span className="breadcrumbs__link breadcrumbs__link--active" >
                Каталог
              </span>}
          </li>
          {pageName &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {pageName}
              </span>
            </li>}
        </ul>
      </div>
    </div>
  );
}
