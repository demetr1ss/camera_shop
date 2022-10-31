import cn from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { DebounceInput } from 'react-debounce-input';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasBySearchAction } from '../../store/api-actions';
import { getCamerasBySearch } from '../../store/cameras-data/selectors';
import { SearchCameraType } from '../../types/types';

export default function SearchForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputField, setInputField] = useState('');
  const foundCameras = useAppSelector(getCamerasBySearch);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputField(value);

    if (value) {
      dispatch(fetchCamerasBySearchAction(value));
    }
  };

  const handleItemClick = (camera: SearchCameraType) => {
    navigate(generatePath(AppRoute.ProductPage, { id: String(camera.id) }));
  };

  const handleKeyDownClick = (evt: React.KeyboardEvent<HTMLLIElement>, camera: SearchCameraType) => {
    if (evt.key === 'Enter') {
      handleItemClick(camera);
    }
  };

  const formSearchClassName = cn('form-search', {
    'list-opened': inputField && foundCameras.length,
  });

  return (
    <ClickAwayListener onClickAway={() => setInputField('')}>
      <div className={formSearchClassName} data-testid="search form">
        <form>
          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens" />
            </svg>
            <DebounceInput
              className="form-search__input"
              type="text" autoComplete="off"
              placeholder="Поиск по сайту"
              onChange={handleChange}
              debounceTimeout={300}
              value={inputField}
            />
          </label>
          <ul className="form-search__select-list scroller">
            {foundCameras?.map((camera) => (
              <li
                key={camera.id}
                className="form-search__select-item"
                tabIndex={0}
                onClick={() => handleItemClick(camera)}
                onKeyDown={(evt) => handleKeyDownClick(evt, camera)}
              >
                {camera.name}
              </li>
            ))}
          </ul>
        </form>
        <button className="form-search__reset" type="reset" onClick={() => setInputField('')}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>
      </div>
    </ClickAwayListener>
  );
}
