import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { mockStore } from '../../tests/mocks/mock-store';
import { createRandomCamera } from '../../tests/mocks/mocks';
import Breadcrumbs from './breadcrumbs';

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
          <Breadcrumbs productName={mockCamera.name} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });
});
