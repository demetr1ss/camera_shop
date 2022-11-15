import {ChangeEvent, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {OrderType, QueryParameter, SortType} from '../../../const/const';
import {useAppSelector} from '../../../hooks';
import {getCurrentCatalogPath} from '../../../store/app-process/selectors';

export default function CatalogSort() {
  const {search} = useAppSelector(getCurrentCatalogPath);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has(QueryParameter.Sort) && !searchParams.has(QueryParameter.Order)) {
      searchParams.set(QueryParameter.Order, OrderType.Asc);
      setSearchParams(searchParams);
    }

    if (!searchParams.has(QueryParameter.Sort) && searchParams.has(QueryParameter.Order)) {
      searchParams.set(QueryParameter.Sort, SortType.Price);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name} = target;
    const value = target.getAttribute('data-value');

    switch (name) {
      case QueryParameter.Sort:
        searchParams.set(QueryParameter.Sort, String(value));
        break;
      case QueryParameter.Order:
        searchParams.set(QueryParameter.Order, String(value));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">
            Сортировать:
          </p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="_sort"
                data-value="price"
                onChange={handleInputChange}
                checked={search?.includes(SortType.Price) || false}
              />
              <label htmlFor="sortPrice">
                по цене
              </label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="_sort"
                data-value="rating"
                onChange={handleInputChange}
                checked={search?.includes(SortType.Rating) || false}
              />
              <label htmlFor="sortPopular">
                по популярности
              </label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="_order"
                data-value="asc"
                aria-label="По возрастанию"
                onChange={handleInputChange}
                checked={search?.includes(OrderType.Asc) || false}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="_order"
                data-value="desc"
                aria-label="По убыванию"
                onChange={handleInputChange}
                checked={search?.includes(OrderType.Desc) || false}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
