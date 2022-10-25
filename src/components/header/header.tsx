import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import SearchForm from '../search-form/search-form';

export default function Header() {
  return (
    <header className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Main}
          aria-label="Переход на главную"
          data-testid="header__logo-link"
        >
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className="main-nav__link"
                to={AppRoute.Main}
              >
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <a className="header__basket-link" href="/#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
        </a>
      </div>
    </header>
  );
}
