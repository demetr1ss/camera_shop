import ProductTabs from '../product-tabs/product-tabs';
import {MAX_RATING} from '../../../const/const';
import {useAppSelector} from '../../../hooks';
import {getReviewsTotalCount} from '../../../store/reviews-data/selectors';
import {CameraType} from '../../../types/types';

type ProductPropsType = {
  camera: CameraType;
  setIsAddItemModalOpened: (status: boolean) => void;
  setCurrentCamera: (camera: CameraType) => void;
}

export default function Product({camera, setIsAddItemModalOpened, setCurrentCamera}: ProductPropsType): JSX.Element {
  const reviewsCount = useAppSelector(getReviewsTotalCount);
  const {
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    rating,
    price,
    category
  } = camera;

  const onBuyButtonClick = () => {
    setIsAddItemModalOpened(true);
    setCurrentCamera(camera);
  };

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
              <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="560" height="480" alt={name} />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{name.includes('Ретрокамера') ? name : `${category} ${name}`}</h1>
            <div className="rate product__rate">
              {Array.from({length: MAX_RATING}, (_, index) => (
                <svg width="17" height="16" aria-hidden="true" key={index}>
                  <use xlinkHref={`#icon${index < rating ? '-full' : ''}-star`} />
                </svg>
              ))}
              <p className="visually-hidden">
                Рейтинг: {rating}
              </p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>
                {reviewsCount}
              </p>
            </div>
            <p className="product__price">
              <span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽
            </p>
            <button className="btn btn--purple" type="button" onClick={onBuyButtonClick}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>Добавить в корзину
            </button>
            <ProductTabs camera={camera} />
          </div>
        </div>
      </section>
    </div>
  );
}
