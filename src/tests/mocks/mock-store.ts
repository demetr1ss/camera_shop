import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { DEFAULT_PAGE, LoadingStatus } from '../../const/const';
import { createRandomCamera, createRandomCamerasPriceRange, createRandomPromo, createRandomReviews, createRandomSearchCameras, MOCK_CAMERAS_TOTAL_COUNT, MOCK_REVIEWS_TOTAL_COUNT } from './mocks';
import { createAPI } from '../../services/api';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const store = configureMockStore(middlewares);
const mockCamera = createRandomCamera();
const mockCameras = [createRandomCamera(), mockCamera];
const mockCamerasPriceRange = createRandomCamerasPriceRange();
const mockSearchCameras = [createRandomSearchCameras()];
const mockSimilarCameras = [createRandomCamera(), mockCamera];
const mockReviews = createRandomReviews();

export const mockStore = store({
  APP: {
    currentCatalogPath: {
      currentPage: DEFAULT_PAGE
    }
  },
  CAMERAS: {
    camera: mockCamera,
    cameras: mockCameras,
    camerasPriceRange: mockCamerasPriceRange,
    searchCameras: mockSearchCameras,
    similarCameras: mockSimilarCameras,
    camerasTotalCount: MOCK_CAMERAS_TOTAL_COUNT,
    camerasLoadingStatus: LoadingStatus.Fulfilled,
    cameraLoadingStatus: LoadingStatus.Fulfilled,
  },
  PROMO: {
    promo: createRandomPromo(),
  },
  REVIEWS: {
    reviews: mockReviews,
    reviewLoadingStatus: LoadingStatus.Fulfilled,
    reviewSendingStatus: LoadingStatus.Idle,
    reviewsTotalCount: MOCK_REVIEWS_TOTAL_COUNT
  }
});
