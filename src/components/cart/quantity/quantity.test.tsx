
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';
import {createRandomCamera} from '../../../tests/mocks/mocks';
import HistoryRouter from '../../history-route/history-route';
import Quantity from './quantity';

const mockCamera = createRandomCamera();

describe('Component: Quantity', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Quantity camerasCount={10} uniqueCamera={mockCamera} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('btn-minus')).toBeInTheDocument();
    expect(screen.getByTestId('btn-plus')).toBeInTheDocument();
    expect(screen.getByTestId('counter')).toBeInTheDocument();
  });
});
