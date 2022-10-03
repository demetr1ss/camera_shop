import { LoadingStatus, NameSpace } from '../../const/const';
import { StateType } from '../../types/state-type';
import { ReviewType } from '../../types/types';

export const getReviews = (state: StateType): ReviewType[] =>
  state[NameSpace.Reviews].reviews;

export const getReviewSendingStatus = (state: StateType): LoadingStatus =>
  state[NameSpace.Reviews].reviewSendingStatus;

export const getReviewsLoadingStatus = (state: StateType): LoadingStatus =>
  state[NameSpace.Reviews].reviewLoadingStatus;

export const gerReviewsTotalCount = (state: StateType): number =>
  state[NameSpace.Reviews].reviewsTotalCount;
