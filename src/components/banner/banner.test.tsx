import HistoryRouter from '../../components/history-route/history-route';
import Banner from './banner';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../tests/mocks/mock-store';

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
