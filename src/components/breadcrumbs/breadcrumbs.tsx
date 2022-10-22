import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { getCurrentPage } from '../../store/app-process/selectors';

type BreadcrumbsPropsType = {
  productName?: string;
}

export default function Breadcrumbs({ productName }: BreadcrumbsPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);

  return (
    <div className="breadcrumbs" data-testid="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link
              className="breadcrumbs__link"
              to={AppRoute.Main}
              onClick={() => dispatch(fetchCamerasAction({ page: currentPage }))}
            >
              Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            {productName ?
              <Link
                className="breadcrumbs__link"
                to={AppRoute.CatalogPage}
                onClick={() => dispatch(fetchCamerasAction({ page: currentPage }))}
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
          {productName &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {productName}
              </span>
            </li>}
        </ul>
      </div>
    </div>
  );
}
