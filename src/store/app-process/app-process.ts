import { createSlice } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { DEFAULT_PAGE, NameSpace } from '../../const/const';

export type AppProcessType = {
  currentPage: number;
  currentSortType?: string;
  currentOrderType?: string;
}

const urlSearchParams = new URLSearchParams(browserHistory.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const initialState: AppProcessType = {
  currentPage: Number(params?.['_page']) || DEFAULT_PAGE,
  currentSortType: params?.['_sort'],
  currentOrderType: params?.['_order'],
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    changeCurrentSortType: (state, action) => {
      state.currentSortType = action.payload;
    },
    changeCurrentOrderType: (state, action) => {
      state.currentOrderType = action.payload;
    }
  },
});

export const { changeCurrentPage, changeCurrentSortType, changeCurrentOrderType } = appProcess.actions;
