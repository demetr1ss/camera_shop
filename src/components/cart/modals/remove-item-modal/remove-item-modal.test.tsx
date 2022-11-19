import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../tests/mocks/mock-store';
import {createRandomCamera} from '../../../../tests/mocks/mocks';
import HistoryRouter from '../../../history-route/history-route';
import RemoveItemModal from './remove-item-modal';

const camera = createRandomCamera();
const setIsRemoveItemModalOpened = jest.fn();

describe('Component: OrderSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history} >
        <Provider store={mockStore} >
          <RemoveItemModal camera={camera} setIsRemoveItemModalOpened={setIsRemoveItemModalOpened} />
        </Provider>
      </HistoryRouter>,
    );

    const name = `${camera.category} ${camera.name}`;

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
