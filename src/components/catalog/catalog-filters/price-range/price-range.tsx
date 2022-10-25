export default function PriceRange() {
  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="price"
            placeholder="MIN"
          />
        </label>
      </div>
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="priceUp"
            placeholder="MAX"
          />
        </label>
      </div>
    </div>
  );
}
