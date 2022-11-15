import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const/const';
import {CurrentCatalogPathType} from '../../types/types';

export type AppProcessStateType = {
  currentCatalogPath: CurrentCatalogPathType;
}

const initialState: AppProcessStateType = {
  currentCatalogPath: {} as CurrentCatalogPathType,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentCatalogPath: (state, action) => {
      state.currentCatalogPath = action.payload;
    },
  }
});

export const {
  setCurrentCatalogPath,
} = appProcess.actions;
