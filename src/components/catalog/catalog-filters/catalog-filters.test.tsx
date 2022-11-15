import HistoryRouter from '../../history-route/history-route';
import CatalogFilters from './catalog-filters';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';

describe('Component: CatalogFilters', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <CatalogFilters />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('catalog filter')).toBeInTheDocument();
  });
});
