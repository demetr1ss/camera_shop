import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const/const';
import { fetchCamerasAction } from '../api-actions';
import { CameraType } from '../../types/types';

export type CamerasDataType = {
  cameras: CameraType[];
  camerasTotalCount: number;
  camerasLoadingStatus: LoadingStatus;
};

const initialState: CamerasDataType = {
  camerasTotalCount: 0,
  cameras: [],
  camerasLoadingStatus: LoadingStatus.Idle,
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
      });
  }});
