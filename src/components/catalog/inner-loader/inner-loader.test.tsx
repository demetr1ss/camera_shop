import HistoryRouter from '../../history-route/history-route';
import InnerLoader from './inner-loader';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';

describe('Component: InnerLoader', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <InnerLoader />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('inner-loader')).toBeInTheDocument();
  });
});
