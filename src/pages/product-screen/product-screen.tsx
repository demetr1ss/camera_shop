import FocusLock from 'react-focus-lock';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import AddItemModal from '../../components/cart/add-item-modal/add-item-modal';
import AddItemSuccesModal from '../../components/cart/add-item-success-modal/add-item-succes-modal';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductSimilar from '../../components/product-components/product-similar/product-similar';
import Product from '../../components/product-components/product/product';
import ReviewForm from '../../components/product-components/review-modal-form/review-form/review-form';
import ReviewSuccessModal from '../../components/product-components/review-success-modal/review-success-modal';
import LoadingScreen from '../loading-screen/loading-screen';
import Reviews from '../../components/product-components/reviews/reviews';
import {RemoveScroll} from 'react-remove-scroll';
import {useParams} from 'react-router-dom';
import {LoadingStatus} from '../../const/const';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCameraAction} from '../../store/api-actions';
import {getCamera, getCameraLoadingStatus, getSimilarCameras} from '../../store/cameras-data/selectors';
import {CameraType} from '../../types/types';
import {scrollToTop} from '../../utils/utils';

export default function ProductScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameraAction(String(id)));
  }, [dispatch, id]);

  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);
  const [currentCamera, setCurrentCamera] = useState({} as CameraType);
  const [isReviewModalOpened, setIsReviewModalOpened] = useState(false);
  const [isReviewSuccessModalOpened, setIsReviewSuccessModalOpened] = useState(false);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const [isAddItemSuccessModalOpened, setIsAddItemSuccessModalOpened] = useState(false);

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
          <Breadcrumbs productName={camera.name} category={camera.category} />
          <Product camera={camera} setIsAddItemModalOpened={setIsAddItemModalOpened} setCurrentCamera={setCurrentCamera} />
          {similarCameras.length > 0 &&
            <ProductSimilar
              similarCameras={similarCameras}
              setIsAddItemModalOpened={setIsAddItemModalOpened}
              setCurrentCamera={setCurrentCamera}
            />}
          <Reviews cameraId={String(id)} setIsReviewModalOpened={setIsReviewModalOpened} />
        </div>
        <button type="button" className="up-btn" onClick={() => scrollToTop(0)}>
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2" />
          </svg>
        </button>
        {isAddItemModalOpened &&
          <FocusLock>
            <RemoveScroll enabled={isAddItemModalOpened}>
              <AddItemModal
                camera={currentCamera}
                isAddItemModalOpened={isAddItemModalOpened}
                setIsAddItemModalOpened={setIsAddItemModalOpened}
                setIsAddItemSuccessModalOpened={setIsAddItemSuccessModalOpened}
              />
            </RemoveScroll>
          </FocusLock>}

        {isAddItemSuccessModalOpened &&
          <FocusLock>
            <RemoveScroll enabled={isAddItemSuccessModalOpened}>
              <AddItemSuccesModal
                setIsAddItemSuccessModalOpened={setIsAddItemSuccessModalOpened}
              />
            </RemoveScroll>
          </FocusLock>}

        {isReviewModalOpened &&
          <FocusLock>
            <RemoveScroll enabled={isReviewModalOpened}>
              <ReviewForm
                isReviewModalOpened={isReviewModalOpened}
                setIsReviewModalOpened={setIsReviewModalOpened}
                setIsReviewSuccessModalOpened={setIsReviewSuccessModalOpened}
              />
            </RemoveScroll>
          </FocusLock>}

        {isReviewSuccessModalOpened &&
          <FocusLock>
            <RemoveScroll enabled={isReviewSuccessModalOpened}>
              <ReviewSuccessModal setIsReviewSuccessModalOpened={setIsReviewSuccessModalOpened} />
            </RemoveScroll>
          </FocusLock>}
      </main>
      <Footer />
    </div>
  );
}

