import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { mockStore } from '../../utils/mocks/mock-store';
import Banner from './banner';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Banner />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Профессиональная камера от известного производителя')).toBeInTheDocument();
  });
});
