import { LoadingStatus, NameSpace } from '../../const/const';
import { ReviewType } from '../../types/types';
import { StateType } from '../../types/state-type';

export const getReviews = (state: StateType): ReviewType[] =>
  state[NameSpace.Reviews].reviews;

export const getReviewSendingStatus = (state: StateType): LoadingStatus =>
  state[NameSpace.Reviews].reviewSendingStatus;
