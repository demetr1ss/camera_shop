import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { mockStore } from '../../../tests/mocks/mock-store';
import { createRandomCamera } from '../../../tests/mocks/mocks';
import HistoryRouter from '../../history-route/history-route';
import CatalogCards from './catalog-cards';

const mockCameras = [createRandomCamera()];

describe('Component: CatalogCards', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <CatalogCards cameras={mockCameras} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('catalog cards')).toBeInTheDocument();
  });
});
