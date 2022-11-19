import useKeydown from '../../../hooks/use-keydown';

type ReviewSuccessModalPropsType = {
  setIsReviewSuccessModalOpened: (status: boolean) => void;
}

export default function ReviewSuccessModal({
  setIsReviewSuccessModalOpened
}: ReviewSuccessModalPropsType) {
  useKeydown('Escape', () => setIsReviewSuccessModalOpened(false));

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => setIsReviewSuccessModalOpened(false)}>
        </div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              autoFocus
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => setIsReviewSuccessModalOpened(false)}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => setIsReviewSuccessModalOpened(false)}
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
