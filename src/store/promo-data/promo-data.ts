import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { fetchPromoAction } from '../api-actions';
import { PromoType } from '../../types/types';

export type PromoDataType = {
  promo: PromoType;
};

const initialState: PromoDataType = {
  promo: {} as PromoType
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }});
