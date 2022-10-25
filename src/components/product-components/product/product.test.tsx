import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../../components/history-route/history-route';
import { mockStore } from '../../../tests/mocks/mock-store';
import { createRandomCamera } from '../../../tests/mocks/mocks';
import Product from './product';

const mockCamera = createRandomCamera();

describe('Component: Product', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Product camera={mockCamera} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });
});
