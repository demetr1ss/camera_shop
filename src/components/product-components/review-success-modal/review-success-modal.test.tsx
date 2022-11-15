import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../components/history-route/history-route';
import {mockStore} from '../../../tests/mocks/mock-store';
import ReviewSuccessModal from './review-success-modal';

describe('Component: ReviewSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <ReviewSuccessModal setIsReviewSuccessModalOpened={() => true} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
