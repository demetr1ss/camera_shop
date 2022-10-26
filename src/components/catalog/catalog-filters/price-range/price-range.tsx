import { useAppSelector } from '../../../../hooks';
import { getCamerasPriceRange } from '../../../../store/cameras-data/selectors';

export default function PriceRange() {
  const camerasPriceRange = useAppSelector(getCamerasPriceRange);

  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="price"
            placeholder={camerasPriceRange.min ? String(camerasPriceRange.min) : ''}
          />
        </label>
      </div>
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="priceUp"
            placeholder={camerasPriceRange.max ? String(camerasPriceRange.max) : ''}
          />
        </label>
      </div>
    </div>
  );
}
