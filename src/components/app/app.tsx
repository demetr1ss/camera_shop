import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute, LoadingStatus } from '../../const/const';
import { useAppSelector } from '../../hooks';
import { getCamerasLoadingStatus } from '../../store/cameras-data/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';


export default function App(): JSX.Element {
  const camerasLoadingStatus = useAppSelector(getCamerasLoadingStatus);

  if (camerasLoadingStatus === LoadingStatus.Idle || camerasLoadingStatus === LoadingStatus.Pending) {
    return <LoadingScreen />;
  }

  return (
    <>
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
        <Route
          path={AppRoute.ProductPage}
          element={<ProductScreen />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </>
  );
}
