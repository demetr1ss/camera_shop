import cn from 'classnames';
import { useEffect, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { LoadingStatus, MIN_REVIEW_LENGTH } from '../../../const/const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { sendReviewAction } from '../../../store/api-actions';
import { getReviewSendingStatus } from '../../../store/reviews-data/selectors';
import { ReviewPostKeysType, ReviewPostType } from '../../../types/types';
import RatingForm from './rating-form';

type ReviewFormPropsType = {
  isReviewModalOpened: boolean
  setIsReviewModalOpened: (status: boolean) => void;
}


export default function ReviewForm({ isReviewModalOpened, setIsReviewModalOpened }: ReviewFormPropsType) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(getReviewSendingStatus);
  const [isFormDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    switch (sendingStatus) {
      case LoadingStatus.Fulfilled:
        setFormDisabled(false);
        setIsReviewModalOpened(false);
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
        throw new Error(`sendingStatus-${sendingStatus} dosn't exist`);
    }
  }, [sendingStatus, setIsReviewModalOpened]);

  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm<ReviewPostType>({
      mode: 'all',
      defaultValues: {
        cameraId: Number(id),
      }
    });

  const onSubmit = (post: ReviewPostType) => {
    const formData = {
      ...post,
      rating: Number(post.rating)
    };

    dispatch(sendReviewAction(formData));
  };

  const modalClassName = cn('modal', {
    'is-active': isReviewModalOpened
  });

  const getInputClassName = (inputName: ReviewPostKeysType, additionalClassName?: string) => {
    if (additionalClassName) {
      return cn(`${additionalClassName} form-review__item`, {
        'is-invalid': errors[inputName]
      });
    }

    return cn('custom-input form-review__item', {
      'is-invalid': errors[inputName]
    });
  };

  return (
    <div className={modalClassName}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <ClickAwayListener onClickAway={() => setIsReviewModalOpened(false)}>
          <div className="modal__content">
            <p className="title title--h4">
              Оставить отзыв
            </p>
            <div className="form-review">
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-review__rate">
                  <RatingForm
                    getInputClassName={getInputClassName}
                    isFormDisabled={isFormDisabled}
                    ratingRegester={{
                      ...register('rating', {
                        required: true,
                      })
                    }}
                  />
                  <div className={getInputClassName('userName')}>
                    <label>
                      <span className="custom-input__label">
                        Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Введите ваше имя"
                        {...register('userName', {
                          required: true
                        })}
                      />
                    </label>
                    {errors?.userName && <p className="custom-input__error">Нужно указать имя</p>}
                  </div>
                  <div className={getInputClassName('advantage')}>
                    <label>
                      <span className="custom-input__label">
                        Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Основные преимущества товара"
                        {...register('advantage', {
                          required: true
                        })}
                      />
                    </label>
                    {errors.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
                  </div>
                  <div className={getInputClassName('disadvantage')}>
                    <label>
                      <span className="custom-input__label">
                        Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Главные недостатки товара"
                        {...register('disadvantage', {
                          required: true
                        })}
                      />
                    </label>
                    {errors.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}
                  </div>
                  <div className={getInputClassName('review', 'custom-textarea')}>
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <textarea
                        placeholder="Поделитесь своим опытом покупки"
                        {...register('review', {
                          required: true,
                          minLength: {
                            value: MIN_REVIEW_LENGTH,
                            message: `Нужно не менее ${MIN_REVIEW_LENGTH} символов`
                          },
                        })}
                      />
                    </label>
                    {errors.review &&
                      <div className="custom-textarea__error">
                        {errors.review.message ? errors.review.message : 'Нужно добавить комментарий'}
                      </div>}
                  </div>
                </div>
                <button
                  className="btn btn--purple form-review__btn"
                  type="submit"
                  disabled={isFormDisabled}
                >
                  {isFormDisabled ? 'Отправляется...' : 'Отправить отзыв'}
                </button>
              </form>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => setIsReviewModalOpened(false)}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
}
