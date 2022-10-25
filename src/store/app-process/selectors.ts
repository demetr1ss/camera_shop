import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state-type';

export const getCurrentCatalogPath = (state: StateType) => state[NameSpace.App].currentCatalogPath;
