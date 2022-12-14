import HistoryRouter from '../../../components/history-route/history-route';
import Product from './product';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';
import {createRandomCamera} from '../../../tests/mocks/mocks';

const mockCamera = createRandomCamera();
const setIsAddItemModalOpened = jest.fn();
const setCurrentCamera = jest.fn();

describe('Component: Product', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Product camera={mockCamera} setIsAddItemModalOpened={setIsAddItemModalOpened} setCurrentCamera={setCurrentCamera} />
        </Provider>
      </HistoryRouter>,
    );

    const name = `${mockCamera.category} ${mockCamera.name}`;

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
