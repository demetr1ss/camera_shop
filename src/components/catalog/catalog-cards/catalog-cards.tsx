import {Link, generatePath} from 'react-router-dom';
import {MAX_RATING, AppRoute} from '../../../const/const';
import {CameraType} from '../../../types/types';

type CatalogCardsPropsType = {
  cameras: CameraType[]
}

export default function CatalogCards({cameras}: CatalogCardsPropsType) {
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
              <button className="btn btn--purple product-card__btn" type="button">
                Купить
              </button>
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
