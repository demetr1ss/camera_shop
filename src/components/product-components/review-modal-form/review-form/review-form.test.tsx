import HistoryRouter from '../../../history-route/history-route';
import ReviewForm from './review-form';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../tests/mocks/mock-store';

const setIsReviewModalOpened = jest.fn();
const setIsReviewSuccessModalOpened = jest.fn();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <ReviewForm
            isReviewModalOpened
            setIsReviewModalOpened={setIsReviewModalOpened}
            setIsReviewSuccessModalOpened={setIsReviewSuccessModalOpened}
          />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('review form')).toBeInTheDocument();
  });
});
