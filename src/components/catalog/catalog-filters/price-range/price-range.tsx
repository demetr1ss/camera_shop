import { ChangeEvent } from 'react';
import { DEFAULT_PAGE } from '../../../../const/const';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchCamerasAction } from '../../../../store/api-actions';
import { changeMaxPrice, changeMinPrice } from '../../../../store/app-process/app-process';
import { getCameraMaxPrice, getCameraMinPrice } from '../../../../store/app-process/selectors';
import { getCamerasPriceRange } from '../../../../store/cameras-data/selectors';

export default function PriceRange() {
  const dispatch = useAppDispatch();
  const camerasPriceRange = useAppSelector(getCamerasPriceRange);
  const minPrice = useAppSelector(getCameraMinPrice);
  const maxPrice = useAppSelector(getCameraMaxPrice);

  const inputMinPriceKeyDownHandler = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      if (Number(minPrice) < camerasPriceRange.min) {
        dispatch(changeMinPrice(camerasPriceRange.min));
      }

      dispatch(fetchCamerasAction({
        page: DEFAULT_PAGE,
        minPrice,
        maxPrice: maxPrice?.length === 0 ? String(camerasPriceRange.max) : maxPrice
      }));
    }
  };

  const inputMaxPriceKeyDownHandler = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      if (Number(maxPrice) > camerasPriceRange.max) {
        dispatch(changeMaxPrice(camerasPriceRange.max));
      }

      dispatch(fetchCamerasAction({
        page: DEFAULT_PAGE,
        minPrice,
        maxPrice,
      }));
    }
  };

  const inputMinPriceChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    dispatch(changeMinPrice(value));
  };

  const inputMaxPriceChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    dispatch(changeMaxPrice(value));
  };

  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="price"
            placeholder={String(camerasPriceRange.min)}
            onChange={inputMinPriceChangeHandler}
            onKeyDown={inputMinPriceKeyDownHandler}
            value={minPrice}
          />
        </label>
      </div>
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="priceUp"
            placeholder={String(camerasPriceRange.max)}
            onChange={inputMaxPriceChangeHandler}
            onKeyDown={inputMaxPriceKeyDownHandler}
            value={maxPrice}
          />
        </label>
      </div>
    </div>
  );
}
