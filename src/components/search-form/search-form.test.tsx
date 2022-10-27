import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { mockStore } from '../../tests/mocks/mock-store';
import HistoryRouter from '../history-route/history-route';
import SearchForm from './search-form';

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <SearchForm />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('search form')).toBeInTheDocument();
  });
});
