import {LoadingStatus, REVIEWS_PER_PAGE} from '../../const/const';
import {createRandomReviews, MOCK_REVIEWS_TOTAL_COUNT} from '../../tests/mocks/mocks';
import {fetchReviewsAction, sendReviewAction} from '../api-actions';
import {changeReviewSendingStatus, reviewsData, ReviewsDataType} from './reviews-data';

const mockReviews = createRandomReviews();

describe('Reducer: reviews-data', () => {
  let state: ReviewsDataType;

  beforeEach(() => {
    state = {
      reviews: [],
      reviewLoadingStatus: LoadingStatus.Idle,
      reviewSendingStatus: LoadingStatus.Idle,
      reviewsTotalCount: REVIEWS_PER_PAGE,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        ...state
      });
  });

  describe('fetchReviewsAction test', () => {
    it('should update reviews and reviewLoadingStatus by load reviews', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: {data: mockReviews, reviewsTotalCount: MOCK_REVIEWS_TOTAL_COUNT}}))
        .toEqual({
          ...state,
          reviews: mockReviews,
          reviewLoadingStatus: LoadingStatus.Fulfilled,
          reviewsTotalCount: MOCK_REVIEWS_TOTAL_COUNT
        });
    });

    it('should update reviewLoadingStatus if fetchReviewsAction rejected', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.rejected.type}))
        .toEqual({
          ...state,
          reviewLoadingStatus: LoadingStatus.Rejected,
        });
    });

    it('should update reviewLoadingStatus if fetchReviewsAction pending', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({
          ...state,
          reviewLoadingStatus: LoadingStatus.Pending,
        });
    });
  });

  describe('sendReviewAction test', () => {
    it('should update reviewSendingStatus if sendReviewAction pending', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.pending.type}))
        .toEqual({
          ...state,
          reviewSendingStatus: LoadingStatus.Pending,
        });
    });

    it('should update reviewSendingStatus if sendReviewAction fulfilled', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.fulfilled.type}))
        .toEqual({
          ...state,
          reviewSendingStatus: LoadingStatus.Fulfilled,
        });
    });

    it('should update reviewSendingStatus if sendReviewAction rejected', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.rejected.type}))
        .toEqual({
          ...state,
          reviewSendingStatus: LoadingStatus.Rejected,
        });
    });

    it('should update reviewSendingStatus when changeReviewSendingStatus', () => {
      expect(reviewsData.reducer(state, changeReviewSendingStatus(LoadingStatus.Pending)))
        .toEqual({
          ...state,
          reviewSendingStatus: LoadingStatus.Pending,
        });
    });
  });
});
