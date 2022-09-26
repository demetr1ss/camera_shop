import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import browserHistory from '../../browser-history';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import HistoryRouter from '../history-route/history-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';


export default function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Navigate to={AppRoute.CatalogPage} replace />}
        />
        <Route
          path={AppRoute.CatalogPage}
          element={<CatalogScreen />}
        />
      </Routes>
    </HistoryRouter >
  );
}
