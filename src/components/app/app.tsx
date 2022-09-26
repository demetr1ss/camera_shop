import browserHistory from '../../browser-history';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import HistoryRouter from '../history-route/history-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute, LoadingStatus } from '../../const/const';
import { useAppSelector } from '../../hooks';
import { getCamerasLoadingStatus } from '../../store/cameras-data/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';


export default function App(): JSX.Element {
  const camerasLoadingStatus = useAppSelector(getCamerasLoadingStatus);

  if (camerasLoadingStatus === LoadingStatus.Idle || camerasLoadingStatus === LoadingStatus.Pending) {
    return <LoadingScreen />;
  }

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
