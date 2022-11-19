import HistoryRouter from '../../components/history-route/history-route';
import CartScreen from './cart-screen';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../tests/mocks/mock-store';

global.scrollTo = jest.fn();

describe('Component: CartScreen', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <CartScreen />
        </Provider>
      </HistoryRouter>,
    );

    const cartOrderButtonElement = await screen.findByText(/Оформить заказ/i);

    expect(cartOrderButtonElement).toBeInTheDocument();
  });
});
