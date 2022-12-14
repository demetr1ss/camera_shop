import HistoryRouter from '../../../components/history-route/history-route';
import ProductTabs from './product-tabs';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';
import {createRandomCamera} from '../../../tests/mocks/mocks';

const mockCamera = createRandomCamera();

describe('Component: ProductTabs', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <ProductTabs camera={mockCamera} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(mockCamera.description)).toBeInTheDocument();
  });
});
