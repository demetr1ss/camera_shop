import cn from 'classnames';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {LoadingStatus} from '../../../const/const';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {sendCouponAction} from '../../../store/api-actions';
import {getCouponSendingStatus} from '../../../store/cameras-data/selectors';

type CartPromoPropsType = {
  setCurrentCoupon: (coupon: string | null) => void
}

export default function CartPromo({setCurrentCoupon}: CartPromoPropsType) {
  const dispatch = useAppDispatch();
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const couponSendingStatus = useAppSelector(getCouponSendingStatus);

  useEffect(() => {
    switch (couponSendingStatus) {
      case LoadingStatus.Fulfilled:
        setFormDisabled(false);
        setInputValue('');
        break;
      case LoadingStatus.Pending:
        setFormDisabled(true);
        break;
      case LoadingStatus.Rejected:
        setFormDisabled(false);
        setCurrentCoupon(null);
        setInputValue('');
        break;
      case LoadingStatus.Idle:
        setFormDisabled(false);
        break;
      default:
        throw new Error(`sendingStatus-${couponSendingStatus} doesn't exist`);
    }
  }, [couponSendingStatus, setCurrentCoupon]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    if (value.includes(' ')) {
      return;
    }

    setInputValue(value);
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    dispatch(sendCouponAction({coupon: inputValue}));
    setCurrentCoupon(inputValue);
  };

  const customInputClassName = cn('custom-input', {
    'is-invalid': couponSendingStatus === LoadingStatus.Rejected,
    'is-valid': couponSendingStatus === LoadingStatus.Fulfilled,
  });

  return (
    <div className="basket__promo">
      <p className="title title--h4">
        Если у вас есть промокод на скидку, примените его в этом поле
      </p>
      <div className="basket-form">
        <form onSubmit={handleFormSubmit}>
          <div className={customInputClassName}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                type="text"
                placeholder="Введите промокод"
                disabled={isFormDisabled}
                value={inputValue}
                onChange={handleInputChange}
                required
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit" disabled={isFormDisabled}>Применить
          </button>
        </form>
      </div>
    </div>
  );
}
