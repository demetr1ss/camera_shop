import HistoryRouter from '../../../history-route/history-route';
import PriceRange from './price-range';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../tests/mocks/mock-store';

describe('Component: PriceRange', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <PriceRange />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('price min')).toBeInTheDocument();
    expect(screen.getByTestId('price max')).toBeInTheDocument();
  });
});
