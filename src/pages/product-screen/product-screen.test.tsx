import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { mockStore } from '../../tests/mocks/mock-store';
import ProductScreen from './product-screen';

describe('Component: ProductScreen', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <ProductScreen />
        </Provider>
      </HistoryRouter>,
    );

    const similarProductsElement = await screen.findByText(/Похожие товары/i);
    const reviewsElement = await screen.findByText(/Отзывы/i);

    expect(similarProductsElement).toBeInTheDocument();
    expect(reviewsElement).toBeInTheDocument();
  });
});
