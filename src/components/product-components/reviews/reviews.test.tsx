import HistoryRouter from '../../../components/history-route/history-route';
import Reviews from './reviews';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../tests/mocks/mock-store';
import {createRandomCamera} from '../../../tests/mocks/mocks';

const mockCamera = createRandomCamera();

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <Reviews cameraId={String(mockCamera.id)} setIsReviewModalOpened={() => true} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });
});
