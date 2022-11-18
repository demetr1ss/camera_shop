import {NameSpace} from '../../const/const';
import {StateType} from '../../types/state-type';
import {CamerasPriceRangeType, CameraType, SearchCameraType} from '../../types/types';

type GroupedCamerasInCartType = {
  [key: string]: CameraType[]
};

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

export const getCamerasBySearch = (state: StateType): SearchCameraType[] =>
  state[NameSpace.Cameras].searchCameras;

export const getCamerasPriceRange = (state: StateType): CamerasPriceRangeType =>
  state[NameSpace.Cameras].camerasPriceRange;

export const getCamerasInCart = (state: StateType): CameraType[] =>
  state[NameSpace.Cameras].camerasInCart;

export const getGroupedCamerasInCart = (state: StateType) => (
  getCamerasInCart(state).reduce<GroupedCamerasInCartType>((prev, curr) => {
    if (!prev[curr.id]) {
      prev[curr.id] = [];
    }

    prev[curr.id].push(curr);

    return prev;
  }, {})
);

export const getDiscount = (state: StateType): number =>
  state[NameSpace.Cameras].discount;

export const getCouponSendingStatus = (state: StateType): string =>
  state[NameSpace.Cameras].discountLoadingStatus;
