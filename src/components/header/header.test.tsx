import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { mockStore } from '../../utils/mocks/mock-store';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('header__logo-link')).toBeInTheDocument();
  });
});
