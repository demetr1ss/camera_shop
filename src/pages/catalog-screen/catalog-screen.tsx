import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogCards from '../../components/catalog/catalog-cards/catalog-cards';
import CatalogFilters from '../../components/catalog/catalog-filters/catalog-filters';
import CatalogSort from '../../components/catalog/catalog-sort/catalog-sort';
import NoCameras from '../../components/catalog/no-cameras/no-cameras';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import InnerLoader from '../loading-screen/inner-loader/inner-loader';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { LIMIT_CARD_PER_PAGE, LoadingStatus, QueryParameter } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction, fetchCamerasPriceRangeAction, fetchPromoAction } from '../../store/api-actions';
import { setCurrentCatalogPath } from '../../store/app-process/app-process';
import { getCameras, getCamerasLoadingStatus, getCamerasTotalCount } from '../../store/cameras-data/selectors';
import ErrorScreen from '../error-screen/error-screen';

export default function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCameras);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const cameraLoadingStatus = useAppSelector(getCamerasLoadingStatus);
  const isCamerasLoadingStatusPending = cameraLoadingStatus === LoadingStatus.Pending;
  const { page } = useParams();
  const [searchParams] = useSearchParams();
  const isMounted = useRef(false);

  const sortParams = useMemo(() => ({
    sortType: searchParams.get(QueryParameter.Sort),
    orderType: searchParams.get(QueryParameter.Order),
  }), [searchParams]);

  const filterParams = useMemo(() => ({
    category: searchParams.getAll(QueryParameter.Category),
    level: searchParams.getAll(QueryParameter.Level),
    maxPrice: searchParams.get(QueryParameter.MaxPrice),
    minPrice: searchParams.get(QueryParameter.MinPrice),
    type: searchParams.getAll(QueryParameter.Type),
  }), [searchParams]);

  const filterParamsJSON = JSON.stringify(filterParams);

  const pagesCount = useMemo(() => (
    Math.ceil(camerasTotalCount / LIMIT_CARD_PER_PAGE)
  ), [camerasTotalCount]);

  const currentPage = Number(page);

  useEffect(() => {
    if (currentPage) {
      dispatch(setCurrentCatalogPath({
        currentPage,
        search: decodeURI(searchParams.toString())
      }));
      dispatch(fetchCamerasAction({
        currentPage,
        params: {
          ...sortParams,
          ...filterParams
        },
      }));
    }
  }, [currentPage, dispatch, filterParams, searchParams, sortParams]);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCamerasPriceRangeAction());
  }, [dispatch, filterParamsJSON]);

  if (currentPage === 0) {
    return <NotFoundScreen />;
  }

  if (isCamerasLoadingStatusPending && !pagesCount && !isMounted.current) {
    return <LoadingScreen />;
  }

  if (cameraLoadingStatus === LoadingStatus.Rejected) {
    return <ErrorScreen />;
  }

  if ((currentPage > pagesCount || currentPage < 1) && pagesCount !== 0) {
    return <NotFoundScreen />;
  }

  isMounted.current = true;


  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">
                Каталог фото- и видеотехники
              </h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilters />
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  {cameraLoadingStatus === LoadingStatus.Pending ? <InnerLoader /> : ''}
                  {cameras.length && !isCamerasLoadingStatusPending ?
                    <>
                      <CatalogCards cameras={cameras} />
                      <Pagination pagesCount={pagesCount} />
                    </>
                    : ''}
                  {!cameras.length && !isCamerasLoadingStatusPending ? <NoCameras /> : ''}
                </div>
              </div>
            </div>
          </section>
        </div >
      </main >
      <Footer />
    </div>
  );
}
