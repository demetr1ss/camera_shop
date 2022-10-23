import { useNavigate } from 'react-router-dom';
import { OrderType, SortType } from '../../../const/const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchCamerasAction } from '../../../store/api-actions';
import { changeCurrentOrderType, changeCurrentSortType } from '../../../store/app-process/app-process';
import { getCurrentPage } from '../../../store/app-process/selectors';

type CatalogSortPropsType = {
  currentSortType?: string;
  currentOrderType?: string;
}

export default function CatalogSort({ currentSortType, currentOrderType }: CatalogSortPropsType) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPage = useAppSelector(getCurrentPage);

  const handleSortTypeChange = (sortType: string) => {
    dispatch(fetchCamerasAction({
      page: currentPage,
      sortType,
      orderType: currentOrderType || OrderType.Asc,
    }));
    dispatch(changeCurrentOrderType(currentOrderType || OrderType.Asc));
    dispatch(changeCurrentSortType(sortType));
    navigate(`?_page=${currentPage}&_sort=${sortType}&_order=${currentOrderType || OrderType.Asc}`);
  };

  const handleOrderTypeChange = (orderType: string) => {
    dispatch(fetchCamerasAction({
      page: currentPage,
      sortType: currentSortType || SortType.Price,
      orderType,
    }));
    dispatch(changeCurrentOrderType(orderType));
    dispatch(changeCurrentSortType(currentSortType || SortType.Price));
    navigate(`?_page=${currentPage}&_sort=${currentSortType || SortType.Price}&_order=${orderType}`);
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
                name="sort"
                onChange={() => handleSortTypeChange(SortType.Price)}
                checked={currentSortType === SortType.Price}
              />
              <label htmlFor="sortPrice">
                по цене
              </label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onChange={() => handleSortTypeChange(SortType.Rating)}
                checked={currentSortType === SortType.Rating}
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
                name="sort-icon"
                aria-label="По возрастанию"
                onChange={() => handleOrderTypeChange(OrderType.Asc)}
                checked={currentOrderType === OrderType.Asc}
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
                name="sort-icon"
                aria-label="По убыванию"
                onChange={() => handleOrderTypeChange(OrderType.Desc)}
                checked={currentOrderType === OrderType.Desc}
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
