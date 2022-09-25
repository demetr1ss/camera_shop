import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const/const';
import MainScreen from '../../pages/main-screen/main-screen';
import HistoryRouter from '../history-route/history-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

export default function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<MainScreen />}
        />
      </Routes>
    </HistoryRouter >
  );
}
