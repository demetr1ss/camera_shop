import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state-type';

export const getCurrentPage = (state: StateType): number =>
  state[NameSpace.App].page;

export const getCurrentSortType = (state: StateType): string | undefined =>
  state[NameSpace.App].sortType;

export const getCurrentOrderType = (state: StateType): string | undefined =>
  state[NameSpace.App].orderType;

export const getCameraMinPrice = (state: StateType): string | undefined =>
  state[NameSpace.App].minPrice;

export const getCameraMaxPrice = (state: StateType): string | undefined =>
  state[NameSpace.App].maxPrice;

export const getCameraCategory = (state: StateType): string[] | undefined =>
  state[NameSpace.App].category;

export const getCameraType = (state: StateType): string[] | undefined =>
  state[NameSpace.App].type;

export const getCameraLevel = (state: StateType): string[] | undefined =>
  state[NameSpace.App].level;

