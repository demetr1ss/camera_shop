import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { APIRoute } from '../const/const';
import { AppDispatchType, StateType } from '../types/state-type';
import { CameraType, PromoType } from '../types/types';
import { showNotify } from '../utils';

export const fetchCamerasAction = createAsyncThunk<{data: CameraType[], camerasTotalCount: number}, number, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async (page, {extra: api}) => {
    try {
      const {data, headers} = await api.get<CameraType[]>(generatePath(APIRoute.Cameras, {
        page: String(page)
      }));

      return {
        data,
        camerasTotalCount: headers['x-total-count']
      };
    }
    catch(e) {
      showNotify({
        type: 'error',
        message: 'Failed to load cameras',
      });
      throw e;
    }});

export const fetchPromoAction = createAsyncThunk<PromoType, undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchPromo',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<PromoType>(APIRoute.Promo);

      return data;
    }
    catch(e) {
      showNotify({
        type: 'error',
        message: 'Failed to load promo',
      });
      throw e;
    }
  }
);

export const fetchCameraAction = createAsyncThunk<CameraType, string, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchCamera',
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<CameraType>(generatePath(APIRoute.Camera, {
        id
      }));

      return data;

    }
    catch(e) {
      showNotify({
        type: 'error',
        message: 'Failed to load camera',
      });
      throw e;
    }});

export const fetchSimilarCamerasAction = createAsyncThunk<CameraType[], string, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchSimilarCameras',
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<CameraType[]>(generatePath(APIRoute.SimilarCameras, {
        id
      }));

      return data;

    }
    catch(e) {
      showNotify({
        type: 'error',
        message: 'Failed to load camera',
      });
      throw e;
    }});