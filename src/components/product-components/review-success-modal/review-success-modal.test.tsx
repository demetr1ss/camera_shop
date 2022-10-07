import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../../components/history-route/history-route';
import { mockStore } from '../../../utils/mocks/mock-store';
import ReviewSuccessModal from './review-succeess-modal';

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
