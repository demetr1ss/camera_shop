import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace, REVIEWS_PER_PAGE } from '../../const/const';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';
import { ReviewType } from '../../types/types';

export type ReviewsDataType = {
  reviews: ReviewType[];
  isReviewsLoading: boolean
  reviewSendingStatus: LoadingStatus;
  reviewsTotalCount: number;
};

const initialState: ReviewsDataType = {
  reviews: [],
  isReviewsLoading: false,
  reviewSendingStatus: LoadingStatus.Idle,
  reviewsTotalCount: REVIEWS_PER_PAGE,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload.data;
        state.reviewsTotalCount = action.payload.reviewsTotalCount;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.reviewSendingStatus = LoadingStatus.Pending;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewSendingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.reviewSendingStatus = LoadingStatus.Rejected;
      });
  }});
