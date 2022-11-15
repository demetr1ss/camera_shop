import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import {generatePath, Navigate, Route, Routes} from 'react-router-dom';
import {AppRoute, DEFAULT_PAGE} from '../../const/const';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <Navigate
            to={{pathname: generatePath(AppRoute.CatalogPage, {page: String(DEFAULT_PAGE)})}}
          />
        }
      />
      <Route
        path={AppRoute.CatalogPage}
        element={<CatalogScreen />}
      />
      <Route
        path={AppRoute.ProductPage}
        element={<ProductScreen />}
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}
