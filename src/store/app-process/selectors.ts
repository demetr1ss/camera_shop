import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state-type';

export const getCurrentPage = (state: StateType): number =>
  state[NameSpace.App].currentPage;

export const getCurrentSortType = (state: StateType): string | undefined =>
  state[NameSpace.App].currentSortType;

export const getCurrentOrderType = (state: StateType): string | undefined =>
  state[NameSpace.App].currentOrderType;
