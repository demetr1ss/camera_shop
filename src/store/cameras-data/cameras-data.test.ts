import {LoadingStatus} from '../../const/const';
import {
  createRandomCamera,
  createRandomCamerasPriceRange,
  createRandomSearchCameras,
  MOCK_CAMERAS_TOTAL_COUNT
} from '../../tests/mocks/mocks';
import {CamerasPriceRangeType, CameraType} from '../../types/types';
import {
  fetchCameraAction,
  fetchCamerasAction,
  fetchCamerasBySearchAction,
  fetchCamerasPriceRangeAction,
  fetchSimilarCamerasAction
} from '../api-actions';
import {camerasData, CamerasDataType} from './cameras-data';

const mockCamera = createRandomCamera();
const mockCameras = [createRandomCamera(), mockCamera];
const mockSearchCameras = [createRandomSearchCameras()];
const mockCamerasPriceRange = createRandomCamerasPriceRange();

describe('Reducer: cameras-data', () => {
  let state: CamerasDataType;

  beforeEach(() => {
    state = {
      camera: {} as CameraType,
      camerasPriceRange: {} as CamerasPriceRangeType,
      searchCameras: [],
      cameras: [],
      similarCameras: [],
      camerasInCart: [],
      camerasTotalCount: 0,
      camerasLoadingStatus: LoadingStatus.Idle,
      cameraLoadingStatus: LoadingStatus.Idle,
      discount: 0,
      discountLoadingStatus: LoadingStatus.Idle
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras, camerasTotalCount and camerasLoadingStatus by load cameras', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: {data: mockCameras, camerasTotalCount: MOCK_CAMERAS_TOTAL_COUNT}}))
        .toEqual({
          cameras: mockCameras,
          camerasLoadingStatus: LoadingStatus.Fulfilled,
          camerasTotalCount: MOCK_CAMERAS_TOTAL_COUNT,
          camerasPriceRange: {} as CamerasPriceRangeType,
          searchCameras: [],
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Idle,
          similarCameras: [],
          camerasInCart: [],
        });
    });

    it('should update camerasLoadingStatus to pending if fetchCamerasAction pending', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.pending.type}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: LoadingStatus.Pending,
          camerasTotalCount: 0,
          camerasPriceRange: {} as CamerasPriceRangeType,
          searchCameras: [],
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Idle,
          similarCameras: [],
          camerasInCart: [],
        });
    });

    it('should update camerasLoadingStatus to rejected if fetchCamerasAction rejected', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.rejected.type}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: LoadingStatus.Rejected,
          camerasTotalCount: 0,
          camerasPriceRange: {} as CamerasPriceRangeType,
          searchCameras: [],
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Idle,
          similarCameras: [],
          camerasInCart: [],
        });
    });
  });

  describe('fetchCameraAction test', () => {
    it('should update camera and cameraLoadingStatus by load camera', () => {
      expect(camerasData.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: mockCamera}))
        .toEqual({
          camera: mockCamera,
          cameraLoadingStatus: LoadingStatus.Fulfilled,
          cameras: [] as CameraType[],
          camerasPriceRange: {} as CamerasPriceRangeType,
          searchCameras: [],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          similarCameras: [] as CameraType[],
          camerasInCart: [],
        });
    });

    it('should update cameraLoadingStatus to pending if fetchCameraAction pending', () => {
      expect(camerasData.reducer(state, {type: fetchCameraAction.pending.type}))
        .toEqual({
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Pending,
          cameras: [] as CameraType[],
          camerasPriceRange: {} as CamerasPriceRangeType,
          searchCameras: [],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          similarCameras: [] as CameraType[],
          camerasInCart: [],
        });
    });

    it('should update cameraLoadingStatus to rejected if fetchCameraAction rejected', () => {
      expect(camerasData.reducer(state, {type: fetchCameraAction.rejected.type}))
        .toEqual({
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Rejected,
          cameras: [] as CameraType[],
          camerasPriceRange: {} as CamerasPriceRangeType,
          searchCameras: [],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          similarCameras: [] as CameraType[],
          camerasInCart: [],
        });
    });
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('should update similarCameras by load similarCameras', () => {
      expect(camerasData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: mockCameras}))
        .toEqual({
          similarCameras: mockCameras,
          camera: {} as CameraType,
          camerasPriceRange: {} as CamerasPriceRangeType,
          searchCameras: [],
          cameraLoadingStatus: LoadingStatus.Idle,
          cameras: [] as CameraType[],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          camerasInCart: [],
        });
    });
  });

  describe('fetchCamerasBySearchAction test', () => {
    it('should update searchCameras by load searchCameras', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasBySearchAction.fulfilled.type, payload: mockSearchCameras}))
        .toEqual({
          searchCameras: mockSearchCameras,
          similarCameras: [] as CameraType[],
          camera: {} as CameraType,
          camerasPriceRange: {} as CamerasPriceRangeType,
          cameraLoadingStatus: LoadingStatus.Idle,
          cameras: [] as CameraType[],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          camerasInCart: [],
        });
    });
  });

  describe('fetchCamerasPriceRangeAction test', () => {
    it('should update camerasPriceRange by load camerasPriceRange', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasPriceRangeAction.fulfilled.type, payload: mockCamerasPriceRange}))
        .toEqual({
          camerasPriceRange: mockCamerasPriceRange,
          searchCameras: [],
          similarCameras: [] as CameraType[],
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Idle,
          cameras: [] as CameraType[],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          camerasInCart: [],
        });
    });
  });
});
