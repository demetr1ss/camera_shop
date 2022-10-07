import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../../components/history-route/history-route';
import { mockStore } from '../../../utils/mocks/mock-store';
import { createRandomCamera } from '../../../utils/mocks/mocks';
import ProductTabs from './product-tabs';

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
