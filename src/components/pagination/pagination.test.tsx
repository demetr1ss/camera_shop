import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import {mockStore} from '../../tests/mocks/mock-store';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Pagination pagesCount={5} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
