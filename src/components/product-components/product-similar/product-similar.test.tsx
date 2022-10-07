import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../../components/history-route/history-route';
import { mockStore } from '../../../utils/mocks/mock-store';
import { createRandomCamera } from '../../../utils/mocks/mocks';
import ProductSimilar from './product-similar';

const mockSimilarCameras = [createRandomCamera()];

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <ProductSimilar similarCameras={mockSimilarCameras} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(mockSimilarCameras[0].name)).toBeInTheDocument();
  });
});
