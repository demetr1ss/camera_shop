import { useEffect, useState } from 'react';
import { LoadingStatus, MAX_RATING, REVIEWS_PER_PAGE } from '../../../const/const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchReviewsAction } from '../../../store/api-actions';
import { getReviews, getReviewsLoadingStatus, getReviewsTotalCount } from '../../../store/reviews-data/selectors';
import { dateTime, humanDate } from '../../../utils/utils';

type ReviewsPropsType = {
  cameraId: string;
  setIsReviewModalOpened: (status: boolean) => void;
}

export default function Reviews({ cameraId, setIsReviewModalOpened }: ReviewsPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const reviewLoadingStatus = useAppSelector(getReviewsLoadingStatus);
  const reviewsTotalCount = useAppSelector(getReviewsTotalCount);
  const [reviewsCount, setReviewsCount] = useState(REVIEWS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchReviewsAction({
      id: Number(cameraId),
      count: reviewsCount
    }));
  }, [cameraId, dispatch, reviewsCount]);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={() => setIsReviewModalOpened(true)}>Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {reviews?.map((reviewItem) => {
              const {
                id,
                userName,
                advantage,
                disadvantage,
                review,
                rating,
                createAt,
              } = reviewItem;
              return (
                <li className="review-card" key={id}>
                  <div className="review-card__head">
                    <p className="title title--h4">{userName}</p>
                    <time className="review-card__data" dateTime={dateTime(createAt)}>{humanDate(createAt)}</time>
                  </div>
                  <div className="rate review-card__rate">
                    {Array.from({ length: MAX_RATING }, (_, index) => (
                      <svg width="17" height="16" aria-hidden="true" key={index}>
                        <use xlinkHref={`#icon${index < rating ? '-full' : ''}-star`} />
                      </svg>
                    ))}
                    <p className="visually-hidden">Оценка: {rating}</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list"><span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">{advantage}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">{disadvantage}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">{review}</p>
                    </li>
                  </ul>
                </li>);
            })}
          </ul>
          {reviewsCount < reviewsTotalCount &&
            <div className="review-block__buttons">
              <button
                className="btn btn--purple"
                type="button"
                onClick={() => setReviewsCount(reviewsCount + REVIEWS_PER_PAGE)}
                disabled={reviewLoadingStatus === LoadingStatus.Pending}
              >
                {reviewLoadingStatus === LoadingStatus.Pending ? 'Загружаем больше отзывов...' : 'Показать больше отзывов'}
              </button>
            </div>}
        </div>
      </section>
    </div>
  );
}
