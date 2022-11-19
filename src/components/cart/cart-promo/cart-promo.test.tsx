
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';
import HistoryRouter from '../../history-route/history-route';
import CartPromo from './cart-promo';

const setCurrentCoupon = jest.fn();

describe('Component: CartPromo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <CartPromo setCurrentCoupon={setCurrentCoupon} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
  });
});
