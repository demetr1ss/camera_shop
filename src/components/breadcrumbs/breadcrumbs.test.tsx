import Breadcrumbs from './breadcrumbs';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../tests/mocks/mock-store';
import {createRandomCamera} from '../../tests/mocks/mocks';

const mockCamera = createRandomCamera();

describe('Component: Breadcrumbs', () => {
  it('should render correctly if catalogPage', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Breadcrumbs />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.queryByText(mockCamera.name)).not.toBeInTheDocument();
  });

  it('should render correctly if productPage', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Breadcrumbs pageName={mockCamera.name} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });

  it('should render correctly if cartPage', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Breadcrumbs pageName={'Корзина'} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText('Корзина')).toBeInTheDocument();
  });
});
