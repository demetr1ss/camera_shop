import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state-type';
import { CameraType } from '../../types/types';

export const getCameras = (state: StateType): CameraType[] =>
  state[NameSpace.Cameras].cameras;

export const getCamerasLoadingStatus = (state: StateType): string =>
  state[NameSpace.Cameras].camerasLoadingStatus;

export const getCamerasTotalCount = (state: StateType): number =>
  state[NameSpace.Cameras].camerasTotalCount;

export const getCamera = (state: StateType): CameraType =>
  state[NameSpace.Cameras].camera;

export const getCameraLoadingStatus = (state: StateType): string =>
  state[NameSpace.Cameras].cameraLoadingStatus;

export const getSimilarCameras = (state: StateType): CameraType[] =>
  state[NameSpace.Cameras].similarCameras;
