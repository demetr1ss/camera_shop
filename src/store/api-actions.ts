import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {generatePath} from 'react-router-dom';
import {APIRoute, AppRoute, LIMIT_CARD_PER_PAGE, OrderType, QueryParameter, SortType} from '../const/const';
import {AppDispatchType, StateType} from '../types/state-type';
import {
  CamerasPriceRangeType,
  CameraType,
  FetchCameraPayloadType,
  FetchCamerasPriceRangePayloadType,
  FetchCamerasType, FetchReviewType,
  PromoType,
  ReviewPostType,
  ReviewType,
  SearchCameraType,
  SendOrderType
} from '../types/types';
import {showNotify} from '../utils/utils';
import {redirectToRoute} from './action';

export const fetchCamerasAction = createAsyncThunk<FetchCamerasType, FetchCameraPayloadType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async ({currentPage, params}, {extra: api}) => {
    const {
      sortType,
      orderType,
      category,
      level,
      maxPrice,
      minPrice,
      type
    } = params;
    try {
      const {data, headers} = await api.get<CameraType[]>(APIRoute.Cameras, {
        params: {
          [QueryParameter.Limit]: LIMIT_CARD_PER_PAGE,
          [QueryParameter.Page]: currentPage,
          [QueryParameter.Sort]: sortType,
          [QueryParameter.Order]: orderType,
          [QueryParameter.MinPrice]: minPrice,
          [QueryParameter.MaxPrice]: maxPrice,
          [QueryParameter.Category]: category,
          [QueryParameter.Type]: type,
          [QueryParameter.Level]: level
        }
      });

      return {
        data,
        camerasTotalCount: headers['x-total-count']
      };
    }
    catch (e) {
      showNotify({
        type: 'error',
        message: 'Failed to load cameras',
      });
      throw e;
    }
  });

export const fetchCamerasPriceRangeAction = createAsyncThunk<CamerasPriceRangeType, FetchCamerasPriceRangePayloadType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchCamerasPriceRange',
  async ({params}, {extra: api}) => {
    const {category, type, level} = params;

    try {
      const responseCameraWithMinPrice = await api.get<CameraType[]>(APIRoute.Cameras, {
        params: {
          [QueryParameter.Sort]: SortType.Price,
          [QueryParameter.Order]: OrderType.Asc,
          [QueryParameter.Limit]: 1,
          [QueryParameter.Category]: category,
          [QueryParameter.Type]: type,
          [QueryParameter.Level]: level
        }
      });

      const responseCameraWithMaxPrice = await api.get<CameraType[]>(APIRoute.Cameras, {
        params: {
          [QueryParameter.Sort]: SortType.Price,
          [QueryParameter.Order]: OrderType.Desc,
          [QueryParameter.Limit]: 1,
          [QueryParameter.Category]: category,
          [QueryParameter.Type]: type,
          [QueryParameter.Level]: level
        }
      });

      return {
        minPriceInRange: responseCameraWithMinPrice.data[0].price,
        maxPriceInRange: responseCameraWithMaxPrice.data[0].price,
      };
    }
    catch (e) {
      showNotify({
        type: 'error',
        message: 'Failed to load cameras price range',
      });
      throw e;
    }
  });

export const fetchCamerasBySearchAction = createAsyncThunk<SearchCameraType[], string, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchCamerasBySearchAction',
  async (value, {extra: api}) => {
    try {
      const {data} = await api.get<CameraType[]>(APIRoute.Cameras, {
        params: {
          [QueryParameter.NameLike]: value,
        }
      });

      return data.map(({name, id}) => ({name, id}));
    }
    catch (e) {
      showNotify({
        type: 'error',
        message: 'Failed to search cameras',
      });
      throw e;
    }
  });

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
    catch (e) {
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

      return data;
    }
    catch (e) {
      showNotify({
        type: 'error',
        message: `Camera ${id} doesn't exist`,
      });
      dispatch(redirectToRoute(AppRoute.NotFound));
      throw e;
    }
  });

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
    catch (e) {
      showNotify({
        type: 'warn',
        message: 'Failed to load similar camera',
      });
      throw e;
    }
  });

export const fetchReviewsAction = createAsyncThunk<{data: ReviewType[], reviewsTotalCount: number}, FetchReviewType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async ({id, count}, {extra: api}) => {
    try {
      const {data, headers} = await api.get<ReviewType[]>(generatePath(APIRoute.Reviews, {id: String(id), count: String(count)}));

      return {
        data,
        reviewsTotalCount: headers['x-total-count']
      };
    }
    catch (e) {
      showNotify({
        type: 'warn',
        message: 'Failed to load reviews'
      });
      throw e;
    }
  });

export const sendReviewAction = createAsyncThunk<void, ReviewPostType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/sendReview',
  async (review, {extra: api}) => {
    try {
      await api.post<ReviewType>(APIRoute.PostReview, review);
    }
    catch (e) {
      showNotify({
        type: 'warn',
        message: 'Failed to send a review'
      });
      throw e;
    }
  });

export const sendCouponAction = createAsyncThunk<number, {coupon: string}, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/sendCoupon',
  async (coupon, {extra: api}) => {
    try {
      const {data} = await api.post(APIRoute.Coupon, coupon);

      return data;
    }
    catch (e) {
      showNotify({
        type: 'warn',
        message: 'Failed to send a coupon'
      });
      throw e;
    }
  });

export const sendOrderAction = createAsyncThunk<void, SendOrderType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/sendOrder',
  async (order, {extra: api}) => {
    try {
      await api.post(APIRoute.Orders, order);
    }
    catch (e) {
      showNotify({
        type: 'warn',
        message: 'Failed to send a order'
      });
      throw e;
    }
  }
);
