import {useState} from 'react';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute, MAX_RATING, MAX_SIMILAR_CAMERAS, SLIDE_STEP} from '../../../const/const';
import {CameraType} from '../../../types/types';

type ProductSimilarPropsType = {
  similarCameras: CameraType[];
  setIsAddItemModalOpened: (status: boolean) => void;
  setCurrentCamera: (camera: CameraType) => void;
}

export default function ProductSimilar({similarCameras, setIsAddItemModalOpened, setCurrentCamera}: ProductSimilarPropsType) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = similarCameras.length - 2;
  const activeSimilarCameras = similarCameras.slice(
    currentSlide, currentSlide + MAX_SIMILAR_CAMERAS
  );

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {activeSimilarCameras.map((camera) => {
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

                return (
                  <div className="product-card is-active" key={id}>
                    <div className="product-card__img">
                      <picture>
                        <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                        <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
                      </picture>
                    </div>
                    <div className="product-card__info">
                      <div className="rate product-card__rate">
                        {Array.from({length: MAX_RATING}, (_, index) => (
                          <svg width="17" height="16" aria-hidden="true" key={index}>
                            <use xlinkHref={`#icon${index < rating ? '-full' : ''}-star`} />
                          </svg>
                        ))}
                        <p className="visually-hidden">Рейтинг: {rating}</p>
                        <p className="rate__count">
                          <span className="visually-hidden">Всего оценок:</span>
                          {reviewCount}
                        </p>
                      </div>
                      <p className="product-card__title">
                        {category} {name}
                      </p>
                      <p className="product-card__price">
                        <span className="visually-hidden">Цена:</span>
                        {price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <div className="product-card__buttons">
                      <button
                        className="btn btn--purple product-card__btn"
                        type="button"
                        onClick={onBuyButtonClick}
                      >
                        Купить
                      </button>
                      <Link
                        className="btn btn--transparent"
                        to={generatePath(AppRoute.ProductPage, {id: String(id)})}
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>);
              })}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={() => setCurrentSlide(currentSlide - SLIDE_STEP)}
              disabled={currentSlide === 0}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={() => setCurrentSlide(currentSlide + SLIDE_STEP)}
              disabled={currentSlide === slidesCount - SLIDE_STEP}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
