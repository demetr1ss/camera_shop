import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state-type';

export const getCurrentPage = (state: StateType): number =>
  state[NameSpace.App].currentPage;
