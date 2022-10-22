import { useEffect } from 'react';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, Filters, MAX_RATING, OrderType, SortType } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { changeCurrentOrderType, changeCurrentPage, changeCurrentSortType } from '../../store/app-process/app-process';
import { getCurrentOrderType, getCurrentPage, getCurrentSortType } from '../../store/app-process/selectors';
import { getCameras } from '../../store/cameras-data/selectors';
import Pagination from '../pagination/pagination';

export default function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cameras = useAppSelector(getCameras);
  const currentPage = useAppSelector(getCurrentPage);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentOrderType = useAppSelector(getCurrentOrderType);

  useEffect(() => {
    navigate(location?.search || `?_page=${currentPage}`);
  }, [currentPage, location?.search, navigate]);


  const handleSortTypeChange = (sortType: string) => {
    dispatch(fetchCamerasAction({
      page: currentPage,
      sortType,
      orderType: currentOrderType || OrderType.Asc,
    }));
    dispatch(changeCurrentOrderType(currentOrderType || OrderType.Asc,));
    dispatch(changeCurrentSortType(sortType));
    dispatch(changeCurrentPage(currentPage));
  };

  const handleOrderTypeChange = (orderType: string) => {
    dispatch(fetchCamerasAction({
      page: currentPage,
      sortType: currentSortType || SortType.Price,
      orderType,
    }));
    dispatch(changeCurrentOrderType(orderType));
    dispatch(changeCurrentSortType(currentSortType || SortType.Price,));
    dispatch(changeCurrentPage(currentPage));
  };

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">
          Каталог фото- и видеотехники
        </h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <div className="catalog-filter">
              <form action="#">
                <h2 className="visually-hidden">
                  Фильтр
                </h2>
                <fieldset className="catalog-filter__block">
                  <legend className="title title--h5">
                    Цена, ₽
                  </legend>
                  <div className="catalog-filter__price-range">
                    <div className="custom-input">
                      <label>
                        <input type="number" name="price" placeholder="от" />
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <input type="number" name="priceUp" placeholder="до" />
                      </label>
                    </div>
                  </div>
                </fieldset>

                {Object.keys(Filters).map((filterType) => (
                  <fieldset className="catalog-filter__block" key={filterType}>
                    <legend className="title title--h5">
                      {filterType}
                    </legend>

                    {Object.keys(Filters[filterType]).map((filterItem) => (
                      <div className="custom-checkbox catalog-filter__item" key={filterItem}>
                        <label>
                          <input type="checkbox" name={filterItem} />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                            {Filters[filterType][filterItem]}
                          </span>
                        </label>
                      </div>
                    ))}
                  </fieldset>
                ))}

                <button className="btn catalog-filter__reset-btn" type="reset">
                  Сбросить фильтры
                </button>
              </form>
            </div>
          </div>
          <div className="catalog__content">
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
            <div className="cards catalog__cards">
              {cameras.map((camera) => {
                const {
                  id,
                  previewImgWebp,
                  previewImgWebp2x,
                  previewImg,
                  previewImg2x,
                  name,
                  rating,
                  reviewCount,
                  price
                } = camera;
                return (
                  <div className="product-card" key={id}>
                    <div className="product-card__img">
                      <picture>
                        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
                        <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
                      </picture>
                    </div>
                    <div className="product-card__info">
                      <div className="rate product-card__rate">
                        {Array.from({ length: MAX_RATING }, (_, index) => (
                          <svg width="17" height="16" aria-hidden="true" key={index}>
                            <use xlinkHref={`#icon${index < rating ? '-full' : ''}-star`} />
                          </svg>
                        ))}
                        <p className="visually-hidden">
                          Рейтинг: {rating}
                        </p>
                        <p className="rate__count">
                          <span className="visually-hidden">Всего оценок:</span>
                          {reviewCount}
                        </p>
                      </div>
                      <p className="product-card__title">
                        {name}
                      </p>
                      <p className="product-card__price">
                        <span className="visually-hidden">Цена:</span>
                        {price} ₽
                      </p>
                    </div>
                    <div className="product-card__buttons">
                      <button className="btn btn--purple product-card__btn" type="button">
                        Купить
                      </button>
                      <Link className="btn btn--transparent" to={generatePath(AppRoute.ProductPage, { id: String(id) })}>
                        Подробнее
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}
