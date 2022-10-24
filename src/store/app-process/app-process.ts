import { createSlice } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { DEFAULT_PAGE, NameSpace, QueryParameter } from '../../const/const';
import { fetchCameraPayloadType } from '../../types/types';

const urlSearchParams = new URLSearchParams(browserHistory.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const initialState: fetchCameraPayloadType = {
  page: Number(params?.[QueryParameter.Page]) || DEFAULT_PAGE,
  sortType: params?.[QueryParameter.Sort],
  orderType: params?.[QueryParameter.Order],
  minPrice: params?.[QueryParameter.MinPrice] || '',
  maxPrice: params?.[QueryParameter.MaxPrice] || '',
  category: [],
  type: [],
  level: [],
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    changeOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    changeMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    changeMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    changeCategory: (state, action) => {
      state.category?.includes(action.payload)
        ? state.category = state.category.filter((category) => category !== action.payload)
        : state.category?.push(action.payload);
    },
    changeType: (state, action) => {
      state.type?.includes(action.payload)
        ? state.type = state.type.filter((type) => type !== action.payload)
        : state.type?.push(action.payload);
    },
    changeLevel: (state, action) => {
      state.level?.includes(action.payload)
        ? state.level = state.level.filter((level) => level !== action.payload)
        : state.level?.push(action.payload);
    },
  },
});

export const {
  changeCurrentPage,
  changeSortType,
  changeOrderType,
  changeMinPrice,
  changeMaxPrice,
  changeCategory,
  changeType,
  changeLevel
} = appProcess.actions;
