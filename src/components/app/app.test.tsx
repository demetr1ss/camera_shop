import HistoryRouter from '../history-route/history-route';
import App from './app';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {AppRoute, DEFAULT_PAGE} from '../../const/const';
import {mockStore} from '../../tests/mocks/mock-store';
import {createRandomCamera} from '../../tests/mocks/mocks';

global.scrollTo = jest.fn();

const mockCamera = createRandomCamera();
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={mockStore}>
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

  it('should render "CatalogScreen" when user navigate to "/catalog/page_:page"', () => {
    history.push(generatePath(AppRoute.CatalogPage, {page: String(DEFAULT_PAGE)}));

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductScreen" when user navigate to "/product/:id"', async () => {
    history.push(generatePath(AppRoute.ProductPage, {id: String(mockCamera.id)}));

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
});
