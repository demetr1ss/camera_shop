import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters, FilterTitle, FILTER_PARAMS } from '../../../const/const';
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

        {Object.keys(Filters).map((filter) => {
          const currentParams = Array.from(searchParams.values());

          return (
            <fieldset className="catalog-filter__block" key={filter}>
              <legend className="title title--h5">
                {FilterTitle[filter]}
              </legend>

              {Object.keys(Filters[filter]).map((filterItem) => {
                const isDisabled = () => {
                  if (currentParams.includes(Filters.Category.videocamera)) {
                    return (
                      Filters[filter][filterItem] === Filters.Type.film ||
                      Filters[filter][filterItem] === Filters.Type.snapshot
                    );
                  }

                  if (currentParams.includes(Filters.Type.film) || currentParams.includes(Filters.Type.snapshot)) {
                    return (
                      Filters[filter][filterItem] === Filters.Category.videocamera
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
                        onChange={() => changeSearch(filter.toLowerCase(), Filters[filter][filterItem])}
                        checked={currentParams.includes(Filters[filter][filterItem])}
                        disabled={isDisabled()}
                      />
                      <span className="custom-checkbox__icon" />
                      <span className="custom-checkbox__label">
                        {Filters[filter][filterItem]}
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
