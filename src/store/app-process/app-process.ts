import { createSlice } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { DEFAULT_PAGE, NameSpace } from '../../const/const';

export type AppProcessType = {
  currentPage: number;
}

const initialState: AppProcessType = {
  currentPage: Number(browserHistory.location?.search.at(-1) || DEFAULT_PAGE)
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {changeCurrentPage} = appProcess.actions;
