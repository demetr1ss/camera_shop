import { LoadingStatus } from '../../const/const';
import { CameraType } from '../../types/types';
import { createRandomCamera, MOCK_CAMERAS_TOTAL_COUNT } from '../../utils/mocks/mocks';
import { fetchCameraAction, fetchCamerasAction, fetchSimilarCamerasAction } from '../api-actions';
import { camerasData, CamerasDataType } from './cameras-data';

const mockCameras = [createRandomCamera(), createRandomCamera(), createRandomCamera()];
const mockCamera = createRandomCamera();

describe('Reducer: cameras-data', () => {
  let state: CamerasDataType;

  beforeEach(() => {
    state = {
      camera: {} as CameraType,
      searchCameras: [],
      cameras: [],
      similarCameras: [],
      camerasTotalCount: 0,
      camerasLoadingStatus: LoadingStatus.Idle,
      cameraLoadingStatus: LoadingStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras, camerasTotalCount and camerasLoadingStatus by load cameras', () => {
      expect(camerasData.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: { data: mockCameras, camerasTotalCount: MOCK_CAMERAS_TOTAL_COUNT } }))
        .toEqual({
          cameras: mockCameras,
          camerasLoadingStatus: LoadingStatus.Fulfilled,
          camerasTotalCount: MOCK_CAMERAS_TOTAL_COUNT,
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Idle,
          similarCameras: [],
        });
    });

    it('should update camerasLoadingStatus to pending if fetchCamerasAction pending', () => {
      expect(camerasData.reducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: LoadingStatus.Pending,
          camerasTotalCount: 0,
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Idle,
          similarCameras: [],
        });
    });

    it('should update camerasLoadingStatus to rejected if fetchCamerasAction rejected', () => {
      expect(camerasData.reducer(state, { type: fetchCamerasAction.rejected.type }))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: LoadingStatus.Rejected,
          camerasTotalCount: 0,
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Idle,
          similarCameras: [],
        });
    });
  });

  describe('fetchCameraAction test', () => {
    it('should update camera and cameraLoadingStatus by load camera', () => {
      expect(camerasData.reducer(state, { type: fetchCameraAction.fulfilled.type, payload: mockCamera }))
        .toEqual({
          camera: mockCamera,
          cameraLoadingStatus: LoadingStatus.Fulfilled,
          cameras: [] as CameraType[],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          similarCameras: [] as CameraType[]
        });
    });

    it('should update cameraLoadingStatus to pending if fetchCameraAction pending', () => {
      expect(camerasData.reducer(state, { type: fetchCameraAction.pending.type }))
        .toEqual({
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Pending,
          cameras: [] as CameraType[],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          similarCameras: [] as CameraType[]
        });
    });

    it('should update cameraLoadingStatus to rejected if fetchCameraAction rejected', () => {
      expect(camerasData.reducer(state, { type: fetchCameraAction.rejected.type }))
        .toEqual({
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Rejected,
          cameras: [] as CameraType[],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
          similarCameras: [] as CameraType[]
        });
    });
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('should update similarCameras by load similarCameras', () => {
      expect(camerasData.reducer(state, { type: fetchSimilarCamerasAction.fulfilled.type, payload: mockCameras }))
        .toEqual({
          similarCameras: mockCameras,
          camera: {} as CameraType,
          cameraLoadingStatus: LoadingStatus.Idle,
          cameras: [] as CameraType[],
          camerasLoadingStatus: LoadingStatus.Idle,
          camerasTotalCount: 0,
        });
    });
  });
});
