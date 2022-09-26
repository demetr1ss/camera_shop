import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { camerasData } from '../store/cameras-data/cameras-data';
import { appProcess } from './app-process/app-process';
import { promoData } from './promo-data/promo-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Promo]: promoData.reducer
});
