import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const/const';
import { CameraType, SearchCameraType } from '../../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchCamerasBySearchAction, fetchSimilarCamerasAction } from '../api-actions';

export type CamerasDataType = {
  camera: CameraType;
  cameras: CameraType[];
  searchCameras: SearchCameraType[];
  similarCameras: CameraType[];
  camerasTotalCount: number;
  camerasLoadingStatus: LoadingStatus;
  cameraLoadingStatus: LoadingStatus;
};

const initialState: CamerasDataType = {
  camera: {} as CameraType,
  cameras: [],
  searchCameras: [],
  similarCameras: [],
  camerasTotalCount: 0,
  camerasLoadingStatus: LoadingStatus.Idle,
  cameraLoadingStatus: LoadingStatus.Idle,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
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
      });
  }
});
