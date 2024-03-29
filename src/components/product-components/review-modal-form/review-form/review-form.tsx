import cn from 'classnames';
import useKeydown from '../../../../hooks/use-keydown';
import RatingForm from '../rating-form/rating-form';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {LoadingStatus, MIN_REVIEW_LENGTH, REVIEWS_PER_PAGE} from '../../../../const/const';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {fetchReviewsAction, sendReviewAction} from '../../../../store/api-actions';
import {changeReviewSendingStatus} from '../../../../store/reviews-data/reviews-data';
import {getReviewSendingStatus} from '../../../../store/reviews-data/selectors';
import {ReviewPostKeysType, ReviewPostType} from '../../../../types/types';

type ReviewFormPropsType = {
  isReviewModalOpened: boolean
  setIsReviewModalOpened: (status: boolean) => void;
  setIsReviewSuccessModalOpened: (status: boolean) => void;
}


export default function ReviewForm({isReviewModalOpened, setIsReviewModalOpened, setIsReviewSuccessModalOpened}: ReviewFormPropsType) {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(getReviewSendingStatus);
  const [isFormDisabled, setFormDisabled] = useState(false);

  useKeydown('Escape', () => setIsReviewModalOpened(false));

  useEffect(() => {
    switch (sendingStatus) {
      case LoadingStatus.Fulfilled:
        setFormDisabled(false);
        setIsReviewModalOpened(false);
        setIsReviewSuccessModalOpened(true);
        dispatch(changeReviewSendingStatus(LoadingStatus.Idle));
        dispatch(fetchReviewsAction({
          id: Number(id),
          count: REVIEWS_PER_PAGE
        }));
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
        throw new Error(`sendingStatus-${sendingStatus} doesn't exist`);
    }
  }, [dispatch, id, sendingStatus, setIsReviewModalOpened, setIsReviewSuccessModalOpened]);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ReviewPostType>({
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
    <div className={modalClassName} data-testid="review form">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => setIsReviewModalOpened(false)}>
        </div>
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
                  ratingRegister={{
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
                      autoFocus
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
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => setIsReviewModalOpened(false)}
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
