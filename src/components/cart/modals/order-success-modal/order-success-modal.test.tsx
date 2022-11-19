import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../tests/mocks/mock-store';
import HistoryRouter from '../../../history-route/history-route';
import OrderSuccessModal from './order-success-modal';

const setIsOrderSuccessModalOpened = jest.fn();

describe('Component: OrderSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history} >
        <Provider store={mockStore} >
          <OrderSuccessModal setIsOrderSuccessModalOpened={setIsOrderSuccessModalOpened} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });
});
