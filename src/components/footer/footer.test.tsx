import HistoryRouter from '../../components/history-route/history-route';
import Footer from './footer';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../tests/mocks/mock-store';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Footer />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByText('Задать вопрос')).toBeInTheDocument();
  });
});
