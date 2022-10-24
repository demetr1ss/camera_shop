import { ChangeEvent } from 'react';
import { Filters, FilterType } from '../../../const/const';
import { useAppDispatch } from '../../../hooks';
import { changeCategory, changeLevel, changeType } from '../../../store/app-process/app-process';
import PriceRange from './price-range/price-range';

export default function CatalogFilters() {
  const dispatch = useAppDispatch();

  const filterChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const filterName = evt.target.name;

    if (filterName in Filters[FilterType.Category]) {
      dispatch(changeCategory(Filters[FilterType.Category][filterName]));
    } else if (filterName in Filters[FilterType.Type]) {
      dispatch(changeType(Filters[FilterType.Type][filterName]));
    } else {
      dispatch(changeLevel(Filters[FilterType.Level][filterName]));
    }
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">
          Фильтр
        </h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">
            Цена, ₽
          </legend>
          <PriceRange />
        </fieldset>

        {Object.keys(Filters).map((filterType) => (
          <fieldset className="catalog-filter__block" key={filterType}>
            <legend className="title title--h5">
              {filterType}
            </legend>

            {Object.keys(Filters[filterType]).map((filterItem) => (
              <div className="custom-checkbox catalog-filter__item" key={filterItem}>
                <label>
                  <input type="checkbox" name={filterItem} onChange={filterChangeHandler} />
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
  );
}
