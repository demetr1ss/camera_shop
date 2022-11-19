import ProductSimilar from './product-similar';
import HistoryRouter from '../../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';
import {createRandomCamera} from '../../../tests/mocks/mocks';

const mockSimilarCameras = [createRandomCamera()];
const setIsAddItemModalOpened = jest.fn();
const setCurrentCamera = jest.fn();

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <ProductSimilar
            similarCameras={mockSimilarCameras}
            setIsAddItemModalOpened={setIsAddItemModalOpened}
            setCurrentCamera={setCurrentCamera}
          />
        </Provider>
      </HistoryRouter>,
    );

    const name = `${mockSimilarCameras[0].category} ${mockSimilarCameras[0].name}`;

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
