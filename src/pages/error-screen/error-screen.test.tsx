import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { mockStore } from '../../tests/mocks/mock-store';
import ErrorScreen from './error-screen';

describe('Component: ErrorScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <ErrorScreen />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
