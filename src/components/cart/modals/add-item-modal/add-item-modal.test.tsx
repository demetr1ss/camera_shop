import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../tests/mocks/mock-store';
import {createRandomCamera} from '../../../../tests/mocks/mocks';
import HistoryRouter from '../../../history-route/history-route';
import AddItemModal from './add-item-modal';

const setIsAddItemModalOpened = jest.fn();
const setIsAddItemSuccessModalOpened = jest.fn();
const camera = createRandomCamera();

describe('Component: AddItemModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <AddItemModal
            camera={camera}
            setIsAddItemModalOpened={setIsAddItemModalOpened}
            setIsAddItemSuccessModalOpened={setIsAddItemSuccessModalOpened}
          />
        </Provider>
      </HistoryRouter>,
    );

    const name = `${camera.category} ${camera.name}`;

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
