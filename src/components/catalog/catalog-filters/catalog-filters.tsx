import { Filters } from '../../../const/const';

export default function CatalogFilters() {
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
  );
}
