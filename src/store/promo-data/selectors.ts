import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state-type';
import { PromoType } from '../../types/types';

export const getPromo = (state: StateType): PromoType =>
  state[NameSpace.Promo].promo;
