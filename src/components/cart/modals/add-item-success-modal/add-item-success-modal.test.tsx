import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../tests/mocks/mock-store';
import HistoryRouter from '../../../history-route/history-route';
import AddItemSuccessModal from './add-item-success-modal';

const setIsAddItemSuccessModalOpened = jest.fn();

describe('Component: AddItemSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history} >
        <Provider store={mockStore} >
          <AddItemSuccessModal setIsAddItemSuccessModalOpened={setIsAddItemSuccessModalOpened} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });
});
