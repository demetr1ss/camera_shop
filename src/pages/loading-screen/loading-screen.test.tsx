import HistoryRouter from '../../components/history-route/history-route';
import LoadingScreen from './loading-screen';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../tests/mocks/mock-store';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <LoadingScreen />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });
});
