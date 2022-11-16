import useKeydown from '../../../hooks/use-keydown';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute, DEFAULT_PAGE} from '../../../const/const';
import {useAppSelector} from '../../../hooks';
import {getCurrentCatalogPath} from '../../../store/app-process/selectors';

type AddItemSuccesModalPropsType = {
  setIsAddItemSuccessModalOpened: (status: boolean) => void;
}

export default function AddItemSuccesModal({setIsAddItemSuccessModalOpened}: AddItemSuccesModalPropsType) {
  const {currentPage, search} = useAppSelector(getCurrentCatalogPath);
  useKeydown('Escape', () => setIsAddItemSuccessModalOpened(false));

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => setIsAddItemSuccessModalOpened(false)}>
        </div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              className="btn btn--transparent modal__btn"
              to={{
                pathname: generatePath(AppRoute.CatalogPage, {
                  page: currentPage ? String(currentPage) : String(DEFAULT_PAGE)
                }),
                search
              }}
              onClick={() => setIsAddItemSuccessModalOpened(false)}
            >
              Продолжить покупки
            </Link>
            <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Cartpage}>
              Перейти в корзину
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => setIsAddItemSuccessModalOpened(false)}
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
