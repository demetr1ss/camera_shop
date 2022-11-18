import cn from 'classnames';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {availibleCouponsList, LoadingStatus} from '../../../const/const';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {sendCouponAction} from '../../../store/api-actions';
import {changeCouponSendingStatus} from '../../../store/cameras-data/cameras-data';
import {getCouponSendingStatus} from '../../../store/cameras-data/selectors';

type CartPromoPropsType = {
  setCurrentCoupon: (coupon: typeof availibleCouponsList[number]) => void
}

export default function CartPromo({setCurrentCoupon}: CartPromoPropsType) {
  const dispatch = useAppDispatch();
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const couponSendingStatus = useAppSelector(getCouponSendingStatus);

  useEffect(() => {
    switch (couponSendingStatus) {
      case LoadingStatus.Fulfilled:
        setFormDisabled(false);
        break;
      case LoadingStatus.Pending:
        setFormDisabled(true);
        break;
      case LoadingStatus.Rejected:
        setFormDisabled(false);
        break;
      case LoadingStatus.Idle:
        setFormDisabled(false);
        break;
      default:
        throw new Error(`sendingStatus-${couponSendingStatus} doesn't exist`);
    }
  }, [couponSendingStatus]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    if (value.includes(' ')) {
      return;
    }

    setInputValue(value);
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (availibleCouponsList.includes(inputValue as typeof availibleCouponsList[number])) {
      dispatch(sendCouponAction({coupon: inputValue}));
      setCurrentCoupon(inputValue as typeof availibleCouponsList[number]);
      setInputValue('');
      setIsFormInvalid(false);
    } else {
      setIsFormInvalid(true);
    }

    dispatch(changeCouponSendingStatus(LoadingStatus.Idle));
  };

  const customInputClassName = cn('custom-input', {
    'is-invalid': isFormInvalid,
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
