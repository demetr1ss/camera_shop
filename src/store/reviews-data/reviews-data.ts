import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace, REVIEWS_PER_PAGE } from '../../const/const';
import { ReviewType } from '../../types/types';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';

export type ReviewsDataType = {
  reviews: ReviewType[];
  reviewLoadingStatus: LoadingStatus
  reviewSendingStatus: LoadingStatus;
  reviewsTotalCount: number;
};

const initialState: ReviewsDataType = {
  reviews: [],
  reviewLoadingStatus: LoadingStatus.Idle,
  reviewSendingStatus: LoadingStatus.Idle,
  reviewsTotalCount: REVIEWS_PER_PAGE,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    changeReviewSendingStatus: (state, action) => {
      state.reviewSendingStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload.data;
        state.reviewsTotalCount = action.payload.reviewsTotalCount;
        state.reviewLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
        state.reviewLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.reviewSendingStatus = LoadingStatus.Pending;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.reviewSendingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.reviewSendingStatus = LoadingStatus.Rejected;
      });
  }});

export const {changeReviewSendingStatus} = reviewsData.actions;
