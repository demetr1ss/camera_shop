import {useAppDispatch} from '../../../../hooks';
import useKeydown from '../../../../hooks/use-keydown';
import {removeCamerasFromCart} from '../../../../store/cameras-data/cameras-data';
import {CameraType} from '../../../../types/types';

type RemoveItemModalPropsType = {
  camera: CameraType;
  setIsRemoveItemModalOpened: (status: boolean) => void;
}

export default function RemoveItemModal({
  camera,
  setIsRemoveItemModalOpened
}: RemoveItemModalPropsType) {
  const dispatch = useAppDispatch();
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
  } = camera;

  useKeydown('Escape', () => setIsRemoveItemModalOpened(false));

  const onDeleteButtonClick = () => {
    dispatch(removeCamerasFromCart(camera));
    setIsRemoveItemModalOpened(false);
  };

  return (
    <div className='modal is-active'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => setIsRemoveItemModalOpened(false)}>
        </div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
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
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick={onDeleteButtonClick}
            >
              Удалить
            </button>
            <button
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={() => setIsRemoveItemModalOpened(false)}
            >
              Продолжить покупки
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => setIsRemoveItemModalOpened(false)}
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
