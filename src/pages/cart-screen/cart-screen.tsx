import cn from 'classnames';
import FocusLock from 'react-focus-lock';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import RemoveItemModal from '../../components/cart/remove-item-modal/remove-item-modal';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Quantity from '../../components/cart/quantity/quantity';
import {RemoveScroll} from 'react-remove-scroll';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {getDiscount, getGroupedCamerasInCart} from '../../store/cameras-data/selectors';
import {CameraType} from '../../types/types';
import CartPromo from '../../components/cart/cart-promo/cart-promo';
import {AvailibleCoupons} from '../../const/const';

export default function CartScreen() {
  const discount = useAppSelector(getDiscount);
  const [isRemoveItemModalOpened, setIsRemoveItemModalOpened] = useState(false);
  const [currentCamera, setCurrentCamera] = useState({} as CameraType);
  const [currentCoupon, setCurrentCoupon] = useState('' as keyof typeof AvailibleCoupons);
  const groupedCamerasInCart = useAppSelector(getGroupedCamerasInCart);
  const uniqueCameras = Object.values(groupedCamerasInCart);
  let totalPrice = 0;

  const summaryClassName = cn('basket__summary-value', {
    'basket__summary-value--bonus': discount > 0
  });

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs pageName='Корзина' />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">
                Корзина
              </h1>

              <ul className="basket__list">
                {uniqueCameras.map((duplicateCamerasList) => {
                  const uniqueCamera = duplicateCamerasList[0];
                  const camerasCount = duplicateCamerasList.length;
                  const {
                    id,
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
                  } = uniqueCamera;

                  const priceAmount = price * camerasCount;
                  totalPrice += priceAmount;

                  const handleDeleteButtonClick = () => {
                    setCurrentCamera(uniqueCamera);
                    setIsRemoveItemModalOpened(true);
                  };

                  return (
                    <li className="basket-item" key={id}>
                      <div className="basket-item__img">
                        <picture>
                          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                          <img src={previewImg}
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
                      <p className="basket-item__price">
                        <span className="visually-hidden">Цена:</span>
                        {price.toLocaleString('ru-RU')} ₽
                      </p>
                      <Quantity camerasCount={camerasCount} uniqueCamera={uniqueCamera} />
                      <div className="basket-item__total-price">
                        <span className="visually-hidden">Общая цена:</span>
                        {priceAmount.toLocaleString('ru-RU')} ₽
                      </div>
                      <button
                        className="cross-btn"
                        type="button"
                        aria-label="Удалить товар"
                        onClick={handleDeleteButtonClick}
                      >
                        <svg width="10" height="10" aria-hidden="true">
                          <use xlinkHref="#icon-close" />
                        </svg>
                      </button>
                    </li>);
                })}
              </ul>
              <div className="basket__summary">
                <CartPromo setCurrentCoupon={setCurrentCoupon} />
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className={summaryClassName}>
                      {discount > 0 ? (totalPrice / 100 * discount).toLocaleString('ru-RU') : 0} ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {(totalPrice - (totalPrice / 100 * discount)).toLocaleString('ru-RU')} ₽
                    </span>
                  </p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isRemoveItemModalOpened &&
          <FocusLock>
            <RemoveScroll enabled={isRemoveItemModalOpened}>
              <RemoveItemModal
                camera={currentCamera}
                isRemoveItemModalOpened={isRemoveItemModalOpened}
                setIsRemoveItemModalOpened={setIsRemoveItemModalOpened}
              />
            </RemoveScroll>
          </FocusLock>}
      </main>
      <Footer />
    </div>
  );
}
