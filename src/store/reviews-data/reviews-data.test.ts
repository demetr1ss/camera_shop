import {LoadingStatus, REVIEWS_PER_PAGE} from '../../const/const';
import {createRandomReviews, MOCK_REVIEWS_TOTAL_COUNT} from '../../tests/mocks/mocks';
import {ReviewType} from '../../types/types';
import {fetchReviewsAction, sendReviewAction} from '../api-actions';
import {reviewsData, ReviewsDataType} from './reviews-data';

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
        reviews: [],
        reviewLoadingStatus: LoadingStatus.Idle,
        reviewSendingStatus: LoadingStatus.Idle,
        reviewsTotalCount: REVIEWS_PER_PAGE,
      });
  });

  describe('fetchReviewsAction test', () => {
    it('should update reviews by load reviews', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: {data: mockReviews, reviewsTotalCount: MOCK_REVIEWS_TOTAL_COUNT}}))
        .toEqual({
          reviews: mockReviews,
          reviewLoadingStatus: LoadingStatus.Fulfilled,
          reviewSendingStatus: LoadingStatus.Idle,
          reviewsTotalCount: MOCK_REVIEWS_TOTAL_COUNT,
        });
    });

    it('should update reviewLoadingStatus if fetchReviewsAction rejected', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.rejected.type}))
        .toEqual({
          reviews: [],
          reviewLoadingStatus: LoadingStatus.Rejected,
          reviewSendingStatus: LoadingStatus.Idle,
          reviewsTotalCount: REVIEWS_PER_PAGE,
        });
    });

    it('should update reviewLoadingStatus if fetchReviewsAction pending', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({
          reviews: [],
          reviewLoadingStatus: LoadingStatus.Pending,
          reviewSendingStatus: LoadingStatus.Idle,
          reviewsTotalCount: REVIEWS_PER_PAGE,
        });
    });
  });

  describe('sendReviewAction test', () => {
    it('should update reviewSendingStatus if sendReviewAction pending', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.pending.type}))
        .toEqual({
          reviews: [] as ReviewType[],
          reviewSendingStatus: LoadingStatus.Pending,
          reviewLoadingStatus: LoadingStatus.Idle,
          reviewsTotalCount: REVIEWS_PER_PAGE,
        });
    });

    it('should update reviewSendingStatus if sendReviewAction fulfilled', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.fulfilled.type}))
        .toEqual({
          reviews: [] as ReviewType[],
          reviewSendingStatus: LoadingStatus.Fulfilled,
          reviewLoadingStatus: LoadingStatus.Idle,
          reviewsTotalCount: REVIEWS_PER_PAGE,
        });
    });

    it('should update reviewSendingStatus if sendReviewAction rejected', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.rejected.type}))
        .toEqual({
          reviews: [] as ReviewType[],
          reviewSendingStatus: LoadingStatus.Rejected,
          reviewLoadingStatus: LoadingStatus.Idle,
          reviewsTotalCount: REVIEWS_PER_PAGE,
        });
    });
  });
});
