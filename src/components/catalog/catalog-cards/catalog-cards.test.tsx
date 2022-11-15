import HistoryRouter from '../../history-route/history-route';
import CatalogCards from './catalog-cards';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';
import {createRandomCamera} from '../../../tests/mocks/mocks';

const mockCameras = [createRandomCamera()];
const setCurrentCamera = jest.fn();
const setIsAddItemModalOpened = jest.fn();

describe('Component: CatalogCards', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <CatalogCards cameras={mockCameras} setCurrentCamera={setCurrentCamera} setIsAddItemModalOpened={setIsAddItemModalOpened} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('catalog cards')).toBeInTheDocument();
  });
});
