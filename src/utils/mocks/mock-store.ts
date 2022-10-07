import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { DEFAULT_PAGE, LoadingStatus } from '../../const/const';
import { createRandomCamera, createRandomPromo, createRandomReviews, MOCK_CAMERAS_TOTAL_COUNT, MOCK_REVIEWS_TOTAL_COUNT } from './mocks';

const store = configureMockStore([thunk]);
const mockCamera = createRandomCamera();
const mockCameras = [createRandomCamera(), mockCamera];
const mockSimilarCameras = [createRandomCamera(), mockCamera];
const mockReviews = createRandomReviews();

export const mockStore = store({
  APP: {
    currentPage: DEFAULT_PAGE
  },
  CAMERAS: {
    camera: mockCamera,
    cameras: mockCameras,
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
