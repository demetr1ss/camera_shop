import cn from 'classnames';
import useKeydown from '../../../hooks/use-keydown';
import {useAppDispatch} from '../../../hooks';
import {addCameraToCart} from '../../../store/cameras-data/cameras-data';
import {CameraType} from '../../../types/types';

type AddItemModalPropsType = {
  camera: CameraType;
  isAddItemModalOpened: boolean;
  setIsAddItemModalOpened: (status: boolean) => void;
  setIsAddItemSuccessModalOpened: (status: boolean) => void;
}

export default function AddItemModal({
  camera,
  isAddItemModalOpened,
  setIsAddItemModalOpened,
  setIsAddItemSuccessModalOpened
}: AddItemModalPropsType) {
  const {
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    vendorCode,
    type,
    category,
    level,
    price,
  } = camera;

  const dispatch = useAppDispatch();

  useKeydown('Escape', () => setIsAddItemModalOpened(false));

  const modalClassName = cn('modal', {
    'is-active': isAddItemModalOpened
  });

  const onAddItemButtonClick = () => {
    dispatch(addCameraToCart(camera));
    setIsAddItemModalOpened(false);
    setIsAddItemSuccessModalOpened(true);
  };

  return (
    <div className={modalClassName}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => setIsAddItemModalOpened(false)}>
        </div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                <img
                  src={previewImg}
                  srcSet={`${previewImg2x} 2x`}
                  width="140"
                  height="120"
                  alt={name.includes('Ретрокамера') ? name : `${category} ${name}`}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">
                {name.includes('Ретрокамера') ? name : `${category} ${name}`}
              </p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул: </span>
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">
                  {type} {category === 'Фотоаппарат' ? 'фотокамера' : category.toLocaleLowerCase()}
                </li>
                <li className="basket-item__list-item">
                  {`${level} уровень`}
                </li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>
                {price.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onAddItemButtonClick}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => setIsAddItemModalOpened(false)}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
