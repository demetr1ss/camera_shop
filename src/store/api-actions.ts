import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { APIRoute, AppRoute, REVIEWS_PER_PAGE } from '../const/const';
import { AppDispatchType, StateType } from '../types/state-type';
import { CameraType, fetchReviewType, PromoType, reviewPostType, ReviewType } from '../types/types';
import { showNotify } from '../utils';
import { redirectToRoute } from './action';

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
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<CameraType>(generatePath(APIRoute.Camera, {
        id
      }));
      dispatch(fetchSimilarCamerasAction(String(id)));
      dispatch(fetchReviewsAction({
        id,
        count: String(REVIEWS_PER_PAGE)
      }));

      return data;

    }
    catch(e) {
      showNotify({
        type: 'error',
        message: `Camera ${id} dosn't exist`,
      });
      dispatch(redirectToRoute(AppRoute.NotFound));
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
        type: 'warn',
        message: 'Failed to load similar camera',
      });
      throw e;
    }});

export const fetchReviewsAction = createAsyncThunk<{data: ReviewType[], reviewsTotalCount: number}, fetchReviewType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async ({id, count}, {extra: api}) => {
    try {
      const {data, headers} = await api.get<ReviewType[]>(generatePath(APIRoute.Reviews, {id, count}));

      return {
        data,
        reviewsTotalCount: headers['x-total-count']
      };
    }
    catch(e) {
      showNotify({
        type: 'warn',
        message: 'Failed to load reviews'
      });
      throw e;
    }});

export const sendReviewAction = createAsyncThunk<ReviewType[], reviewPostType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/sendReview',
  async ({
    cameraId,
    userName,
    advantage,
    disadvantage,
    review,
    rating
  }, {extra: api}) => {
    try {
      const {data} = await api.post<ReviewType[]>(APIRoute.PostReview, {
        cameraId,
        userName,
        advantage,
        disadvantage,
        review,
        rating
      });

      return data;
    }
    catch(e) {
      showNotify({
        type: 'warn',
        message: 'Failed to send a review'
      });
      throw e;
    }});
