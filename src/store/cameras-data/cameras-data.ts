import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoadingStatus, NameSpace} from '../../const/const';
import {CamerasPriceRangeType, CameraType, SearchCameraType} from '../../types/types';
import {
  fetchCameraAction,
  fetchCamerasAction,
  fetchCamerasBySearchAction,
  fetchCamerasPriceRangeAction,
  fetchSimilarCamerasAction,
  sendCouponAction
} from '../api-actions';

export type UniqueCamerasCountType = {
  camera: CameraType,
  camerasCount: number
}

export type CamerasDataType = {
  camera: CameraType;
  cameras: CameraType[];
  camerasPriceRange: CamerasPriceRangeType,
  searchCameras: SearchCameraType[];
  similarCameras: CameraType[];
  camerasTotalCount: number;
  camerasLoadingStatus: LoadingStatus;
  cameraLoadingStatus: LoadingStatus;
  camerasInCart: CameraType[];
  discount: number;
  discountLoadingStatus: LoadingStatus;
};

const initialState: CamerasDataType = {
  camera: {} as CameraType,
  cameras: [],
  camerasPriceRange: {} as CamerasPriceRangeType,
  searchCameras: [],
  similarCameras: [],
  camerasTotalCount: 0,
  camerasLoadingStatus: LoadingStatus.Idle,
  cameraLoadingStatus: LoadingStatus.Idle,
  camerasInCart: [],
  discount: 0,
  discountLoadingStatus: LoadingStatus.Idle
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    addCameraToCart: (state, {payload}: PayloadAction<CameraType>) => {
      state.camerasInCart.push(payload);
    },
    removeCamerasFromCart: (state, {payload}: PayloadAction<CameraType>) => {
      state.camerasInCart = state.camerasInCart.filter((camera) =>
        camera.id !== payload.id
      );
    },
    reduceCameraInCart: (state, {payload}: PayloadAction<CameraType>) => {
      const deletedCameraIndex = state.camerasInCart.findIndex((item) => item.id === payload.id);
      state.camerasInCart.splice(deletedCameraIndex, 1);
    },
    changeCamerasCountInCart: (state, {payload}: PayloadAction<UniqueCamerasCountType>) => {
      state.camerasInCart = state.camerasInCart.filter((camera) =>
        camera.id !== payload.camera.id
      );
      const camerasList = Array.from({length: payload.camerasCount}, () => payload.camera);
      state.camerasInCart.push(...camerasList);
    },
    changeCouponSendingStatus: (state, action) => {
      state.discountLoadingStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.camerasLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload.data;
        state.camerasTotalCount = action.payload.camerasTotalCount;
        state.camerasLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.cameras = [];
        state.camerasLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(fetchCameraAction.pending, (state) => {
        state.cameraLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.cameraLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.cameraLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchCamerasBySearchAction.fulfilled, (state, action) => {
        state.searchCameras = action.payload;
      })
      .addCase(fetchCamerasPriceRangeAction.fulfilled, (state, action) => {
        state.camerasPriceRange = action.payload;
      })
      .addCase(sendCouponAction.fulfilled, (state, action) => {
        state.discountLoadingStatus = LoadingStatus.Fulfilled;
        state.discount = action.payload;
      })
      .addCase(sendCouponAction.pending, (state) => {
        state.discountLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(sendCouponAction.rejected, (state) => {
        state.discountLoadingStatus = LoadingStatus.Rejected;
      });
  }
});

export const {
  addCameraToCart,
  removeCamerasFromCart,
  reduceCameraInCart,
  changeCamerasCountInCart,
  changeCouponSendingStatus
} = camerasData.actions;
