import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const/const';
import { CamerasPriceRangeType, CameraType, SearchCameraType } from '../../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchCamerasBySearchAction, fetchCamerasPriceRangeAction, fetchSimilarCamerasAction } from '../api-actions';

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
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    addCameraToCart: (state, action) => {
      state.camerasInCart.push(action.payload);
    },
    removeCameraFromCart: (state, action) => {
      state.camerasInCart = state.camerasInCart.filter((camera) =>
        camera.id !== action.payload.id
      );
    }
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
      });
  }
});


export const {addCameraToCart, removeCameraFromCart} = camerasData.actions;
