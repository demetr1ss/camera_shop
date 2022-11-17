import useKeydown from '../../../hooks/use-keydown';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {MIN_CAMERAS_COUNT, MAX_CAMERAS_COUNT} from '../../../const/const';
import {useAppDispatch} from '../../../hooks';
import {addCameraToCart, changeCamerasCountInCart, reduceCameraInCart} from '../../../store/cameras-data/cameras-data';
import {CameraType} from '../../../types/types';
import ClickAwayListener from 'react-click-away-listener';

type QuantityPropsType = {
  camerasCount: number;
  uniqueCamera: CameraType
}

export default function Quantity({camerasCount, uniqueCamera}: QuantityPropsType) {
  const dispatch = useAppDispatch();
  const inputCamerasCountRef = useRef<HTMLInputElement>(null);
  const [fieldActivated, setIsFieldActivated] = useState(false);

  useEffect(() => {
    if (inputCamerasCountRef.current) {
      inputCamerasCountRef.current.value = String(camerasCount);
    }
  }, [camerasCount]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) < 0) {
      evt.target.value = '';
    }

    setIsFieldActivated(true);
  };

  const changeCamerasCount = () => {
    if (!inputCamerasCountRef.current || !fieldActivated) {
      return;
    }

    setIsFieldActivated(false);

    if (Number(inputCamerasCountRef.current.value) < 1) {
      inputCamerasCountRef.current.value = String(MIN_CAMERAS_COUNT);
    }

    const camerasCountInputValue = inputCamerasCountRef.current?.value;

    dispatch(changeCamerasCountInCart({
      camera: uniqueCamera,
      camerasCount: Number(camerasCountInputValue)
    }));
  };

  useKeydown('Enter', changeCamerasCount);

  return (
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
        disabled={camerasCount === MIN_CAMERAS_COUNT}
        onClick={() => dispatch(reduceCameraInCart(uniqueCamera))}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter1" />
      <ClickAwayListener onClickAway={changeCamerasCount}>
        <input
          ref={inputCamerasCountRef}
          type="number"
          id="counter1"
          min="1"
          max="99"
          aria-label="количество товара"
          onChange={handleInputChange}
        />
      </ClickAwayListener>
      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
        disabled={camerasCount === MAX_CAMERAS_COUNT}
        onClick={() => dispatch(addCameraToCart(uniqueCamera))}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}
