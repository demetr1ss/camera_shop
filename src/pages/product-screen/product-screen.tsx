import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductSimilar from '../../components/product-components/product-similar/product-similar';
import Product from '../../components/product-components/product/product';
import Reviews from '../../components/product-components/reviews/reviews';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraAction } from '../../store/api-actions';
import { getCamera, getCameraLoadingStatus, getSimilarCameras } from '../../store/cameras-data/selectors';
import { scrollToTop } from '../../utils';

export default function ProductScreen(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameraAction(String(id)));
  }, [dispatch, id]);

  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);

  const cameraLoadingStatus = useAppSelector(getCameraLoadingStatus);

  if (
    cameraLoadingStatus === LoadingStatus.Idle ||
    cameraLoadingStatus === LoadingStatus.Pending ||
    !camera
  ) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <main>

        <div className="page-content">
          <Breadcrumbs productName={camera.name} />
          <Product camera={camera} />
          {similarCameras.length > 0 && <ProductSimilar similarCameras={similarCameras} />}
          <Reviews cameraId={String(id)} />
        </div >
      </main >
      <button type="button" className="up-btn" onClick={() => scrollToTop()}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </button>
      <Footer />
    </div>
  );
}

