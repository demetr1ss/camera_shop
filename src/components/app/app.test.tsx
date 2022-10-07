import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, LoadingStatus } from '../../const/const';
import { createRandomCamera, createRandomPromo, createRandomReviews, MOCK_CAMERAS_TOTAL_COUNT, MOCK_REVIEWS_TOTAL_COUNT } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const mockStore = configureMockStore([thunk]);
const mockCamera = createRandomCamera();
const mockCameras = [createRandomCamera(), mockCamera];
const mockSimilarCameras = [createRandomCamera(), mockCamera];
const mockReviews = createRandomReviews();
global.scrollTo = jest.fn();

const store = mockStore({
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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "CatalogScreen" when user navigate to "/catalog"', () => {
    history.push(AppRoute.CatalogPage);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});

it('should render "ProductScreen" when user navigate to "/product:id"', async () => {
  history.push(generatePath(AppRoute.ProductPage, { id: String(mockCamera.id) }));

  render(fakeApp);

  const product = await screen.findByText(/Похожие товары/i);

  expect(product).toBeInTheDocument();
});

it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
  history.push('/non-existent-route');

  render(fakeApp);

  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Page not found')).toBeInTheDocument();
  expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
});
