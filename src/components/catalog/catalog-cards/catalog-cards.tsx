import {Link, generatePath} from 'react-router-dom';
import {MAX_RATING, AppRoute} from '../../../const/const';
import {useAppSelector} from '../../../hooks';
import {getCamerasInCart} from '../../../store/cameras-data/selectors';
import {CameraType} from '../../../types/types';

type CatalogCardsPropsType = {
  cameras: CameraType[];
  setCurrentCamera: (camera: CameraType) => void;
  setIsAddItemModalOpened: (status: boolean) => void;
}

export default function CatalogCards({cameras, setCurrentCamera, setIsAddItemModalOpened}: CatalogCardsPropsType) {
  const camerasInCart = useAppSelector(getCamerasInCart);

  return (
    <div className="cards catalog__cards" data-testid="catalog cards">
      {cameras.map((camera) => {
        const {
          id,
          previewImgWebp,
          previewImgWebp2x,
          previewImg,
          previewImg2x,
          name,
          rating,
          reviewCount,
          price,
          category
        } = camera;

        const onBuyButtonClick = () => {
          setCurrentCamera(camera);
          setIsAddItemModalOpened(true);
        };

        const cameraInCart = camerasInCart.filter((item) => item.id === camera.id);

        return (
          <div className="product-card" key={id}>
            <div className="product-card__img">
              <picture>
                <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                <img src={previewImg} srcSet={`${previewImg2x} 2x`} width={280} height={240} alt={name} />
              </picture>
            </div>
            <div className="product-card__info">
              <div className="rate product-card__rate">
                {Array.from({length: MAX_RATING}, (_, index) => (
                  <svg width="17" height="16" aria-hidden="true" key={`star-${index}`}>
                    <use xlinkHref={`#icon${index < rating ? '-full' : ''}-star`} />
                  </svg>
                ))}
                <p className="visually-hidden">
                  Рейтинг: {rating}
                </p>
                <p className="rate__count">
                  <span className="visually-hidden">Всего оценок:</span>
                  {reviewCount}
                </p>
              </div>
              <p className="product-card__title">
                {name.includes('Ретрокамера') ? name : `${category} ${name}`}
              </p>
              <p className="product-card__price">
                <span className="visually-hidden">Цена:</span>
                {price.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <div className="product-card__buttons">
              {cameraInCart.length > 0 ?
                <Link
                  className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
                  to={AppRoute.CartPage}
                  onClick={() => window.scrollTo({top: 0})}
                >
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-basket"></use>
                  </svg>В корзине
                </Link>
                :
                <button className="btn btn--purple product-card__btn" type="button" onClick={onBuyButtonClick}>
                  Купить
                </button>}
              <Link className="btn btn--transparent" to={generatePath(AppRoute.ProductPage, {id: String(id)})}>
                Подробнее
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
