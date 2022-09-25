import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { camerasData } from '../store/cameras-data/cameras-data';
import { promoData } from './promo-data/promo-data';

export const rootReducer = combineReducers({
  [NameSpace.CamerasTotalCount]: camerasData.reducer,
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Promo]: promoData.reducer
});
