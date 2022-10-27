import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { mockStore } from '../../../tests/mocks/mock-store';
import HistoryRouter from '../../history-route/history-route';
import NoCameras from './no-cameras';

describe('Component: NoCameras', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <NoCameras />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('По вашему запросу ничего не найдено')).toBeInTheDocument();
  });
});
