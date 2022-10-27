import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, FilterTitle, FILTER_PARAMS } from '../../../const/const';
import useResetPage from '../../../hooks/use-reset-page';
import PriceRange from './price-range/price-range';

export default function CatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resetPage = useResetPage();
  const formRef = useRef<HTMLFormElement>(null);

  const changeSearch = (param: string, value: string) => {
    if (!searchParams.getAll(param).includes(value)) {
      searchParams.append(param, value);
      setSearchParams(searchParams);
      resetPage(searchParams);

      return;
    }
    const newParams = Array.from(searchParams.entries())
      .filter(([_, currentValue]) => currentValue !== value);
    const newSearchParams = new URLSearchParams(newParams);

    setSearchParams(newSearchParams);
    resetPage(newSearchParams);
  };

  const handleResetClick = () => {
    const paramsWithOutFilters = Array.from(searchParams.entries())
      .filter(([key]) => !FILTER_PARAMS.includes(key));
    setSearchParams(paramsWithOutFilters);
    formRef.current && formRef.current.reset();
  };

  return (
    <div className="catalog-filter" data-testid="catalog filter">
      <form action="#" ref={formRef}>
        <h2 className="visually-hidden">
          Фильтр
        </h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">
            Цена, ₽
          </legend>
          <PriceRange />
        </fieldset>

        {Object.keys(Filter).map((filterTitle) => {
          const currentParams = Array.from(searchParams.values());
          const filterValue = Filter[filterTitle];

          return (
            <fieldset className="catalog-filter__block" key={filterTitle}>
              <legend className="title title--h5">
                {FilterTitle[filterTitle]}
              </legend>

              {Object.keys(filterValue).map((filterItem) => {
                const filterName = filterValue[filterItem];

                const isDisabled = () => {
                  if (currentParams.includes(Filter.Category.videocamera)) {
                    return (
                      filterName === Filter.Type.film ||
                      filterName === Filter.Type.snapshot
                    );
                  }

                  if (currentParams.includes(Filter.Type.film) || currentParams.includes(Filter.Type.snapshot)) {
                    return (
                      filterName === Filter.Category.videocamera
                    );
                  }

                  return false;
                };
                return (
                  <div className="custom-checkbox catalog-filter__item" key={filterItem}>
                    <label>
                      <input
                        type="checkbox"
                        name={filterItem}
                        onChange={() => changeSearch(filterTitle.toLowerCase(), filterName)}
                        checked={currentParams.includes(filterName)}
                        disabled={isDisabled()}
                      />
                      <span className="custom-checkbox__icon" />
                      <span className="custom-checkbox__label">
                        {filterName}
                      </span>
                    </label>
                  </div>
                );
              })}
            </fieldset>);
        })}

        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleResetClick}
          disabled={!FILTER_PARAMS.some((param) => searchParams.get(param))}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
