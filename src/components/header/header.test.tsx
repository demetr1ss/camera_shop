import HistoryRouter from '../../components/history-route/history-route';
import Header from './header';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../tests/mocks/mock-store';

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
