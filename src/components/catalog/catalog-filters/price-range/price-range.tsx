import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {QueryParameter} from '../../../../const/const';
import {useAppSelector} from '../../../../hooks';
import useKeydown from '../../../../hooks/use-keydown';
import useOutsideClick from '../../../../hooks/use-outside-click';
import useResetPage from '../../../../hooks/use-reset-page';
import {getCamerasPriceRange} from '../../../../store/cameras-data/selectors';

export default function PriceRange() {
  const {minPriceInRange = 0, maxPriceInRange = 0} = useAppSelector(getCamerasPriceRange);
  const inputMinPriceRef = useRef<HTMLInputElement>(null);
  const inputMaxPriceRef = useRef<HTMLInputElement>(null);
  const [isFormActivated, setIsFormActivated] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const resetPage = useResetPage();

  const minPriceSearch = searchParams.get(QueryParameter.MinPrice);
  const maxPriceSearch = searchParams.get(QueryParameter.MaxPrice);

  const handleInputPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) < 0) {
      evt.target.value = '';
    }

    setIsFormActivated(true);
  };

  const changePrice = () => {
    if (!inputMinPriceRef.current || !inputMaxPriceRef.current || !isFormActivated) {
      return;
    }

    setIsFormActivated(false);

    const maxPriceInputValue = inputMaxPriceRef.current?.value;
    const minPriceInputValue = inputMinPriceRef.current?.value;

    if ((!maxPriceInputValue && !minPriceInputValue) && (maxPriceSearch || minPriceSearch)) {
      searchParams.delete(QueryParameter.MaxPrice);
      searchParams.delete(QueryParameter.MinPrice);
      setSearchParams(searchParams);
      resetPage(searchParams);

      return;
    }

    if (!maxPriceInputValue && maxPriceSearch) {
      searchParams.delete(QueryParameter.MaxPrice);
      setSearchParams(searchParams);
      resetPage(searchParams);

      return;
    }

    if (!minPriceInputValue && minPriceSearch) {
      searchParams.delete(QueryParameter.MinPrice);
      setSearchParams(searchParams);
      resetPage(searchParams);

      return;
    }

    if (
      minPriceInputValue === maxPriceInputValue &&
      Number(minPriceInputValue) >= minPriceInRange &&
      Number(maxPriceInputValue) <= maxPriceInRange
    ) {
      searchParams.set(QueryParameter.MinPrice, minPriceInputValue);
      searchParams.set(QueryParameter.MaxPrice, maxPriceInputValue);

      setSearchParams(searchParams);
      resetPage(searchParams);

      return;
    }

    if (minPriceInputValue) {
      searchParams.set(QueryParameter.MinPrice, minPriceInputValue);

      if (
        Number(minPriceInputValue) > (maxPriceInputValue ? Number(maxPriceInputValue) : maxPriceInRange) ||
        Number(minPriceInputValue) < minPriceInRange
      ) {
        inputMinPriceRef.current.value = String(minPriceInRange);
        searchParams.set(QueryParameter.MinPrice, String(minPriceInRange));
      }
    }

    if (maxPriceInputValue) {
      searchParams.set(QueryParameter.MaxPrice, maxPriceInputValue);

      if (
        Number(maxPriceInputValue) < minPriceInRange ||
        Number(maxPriceInputValue) > maxPriceInRange
      ) {
        inputMaxPriceRef.current.value = String(maxPriceInRange);
        searchParams.set(QueryParameter.MaxPrice, String(maxPriceInRange));
      }
    }

    setSearchParams(searchParams);
    resetPage(searchParams);
  };

  useKeydown('Enter', changePrice);
  useOutsideClick(inputMinPriceRef, inputMaxPriceRef, changePrice);

  useEffect(() => {
    if (inputMinPriceRef.current?.value) {
      inputMinPriceRef.current.value = String(minPriceInRange);

      if (minPriceInRange < Number(minPriceSearch)) {
        inputMinPriceRef.current.value = String(minPriceSearch);
      }
    }

    if (inputMaxPriceRef.current?.value) {
      inputMaxPriceRef.current.value = String(maxPriceInRange);

      if (maxPriceInRange > Number(maxPriceSearch)) {
        inputMaxPriceRef.current.value = String(maxPriceSearch);
      }
    }

  }, [maxPriceInRange, maxPriceSearch, minPriceInRange, minPriceSearch]);

  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input
            data-testid="price min"
            ref={inputMinPriceRef}
            type="number"
            name="price_gte"
            placeholder={minPriceInRange.toLocaleString('ru-RU')}
            onChange={handleInputPriceChange}
            defaultValue={minPriceSearch ? minPriceSearch : ''}
          />
        </label>
      </div>
      <div className="custom-input">
        <label>
          <input
            data-testid="price max"
            ref={inputMaxPriceRef}
            type="number"
            name="price_lte"
            placeholder={maxPriceInRange.toLocaleString('ru-RU')}
            onChange={handleInputPriceChange}
            defaultValue={maxPriceSearch ? maxPriceSearch : ''}
          />
        </label>
      </div>
    </div>
  );
}
