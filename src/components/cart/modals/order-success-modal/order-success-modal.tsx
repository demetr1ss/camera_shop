import {generatePath, Link} from 'react-router-dom';
import {AppRoute, DEFAULT_PAGE} from '../../../../const/const';
import {useAppSelector} from '../../../../hooks';
import useKeydown from '../../../../hooks/use-keydown';
import {getCurrentCatalogPath} from '../../../../store/app-process/selectors';

type OrderSuccessModalPropsType = {
  setIsOrderSuccessModalOpened: (status: boolean) => void;
}

export default function OrderSuccessModal({setIsOrderSuccessModalOpened}: OrderSuccessModalPropsType) {
  const {currentPage, search} = useAppSelector(getCurrentCatalogPath);
  useKeydown('Escape', () => setIsOrderSuccessModalOpened(false));

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => setIsOrderSuccessModalOpened(false)}>
        </div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              to={{
                pathname: generatePath(AppRoute.CatalogPage, {
                  page: currentPage ? String(currentPage) : String(DEFAULT_PAGE)
                }),
                search
              }}
              onClick={() => setIsOrderSuccessModalOpened(false)}
            >
              Вернуться к покупкам
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => setIsOrderSuccessModalOpened(false)}
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
