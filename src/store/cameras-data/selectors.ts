import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state-type';
import { CameraType } from '../../types/types';

export const getCameras = (state: StateType): CameraType[] =>
  state[NameSpace.Cameras].cameras;

export const getCamerasLoadingStatus = (state: StateType): string =>
  state[NameSpace.Cameras].camerasLoadingStatus;

export const getCamerasTotalCount = (state: StateType): number =>
  state[NameSpace.Cameras].camerasTotalCount;
