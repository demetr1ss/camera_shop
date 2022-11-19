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
  fetchSimilarCamerasAction,
  sendCouponAction,
  sendOrderAction
} from '../api-actions';
import {
  addCameraToCart,
  camerasData,
  CamerasDataType,
  changeCamerasCountInCart,
  changeCouponSendingStatus,
  changeOrderSendingStatus,
  clearCart,
  reduceCameraInCart,
  removeCamerasFromCart
} from './cameras-data';

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
      discountSendingStatus: LoadingStatus.Idle,
      orderSendingStatus: LoadingStatus.Idle
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras, camerasTotalCount and camerasLoadingStatus by load cameras', () => {
      expect(camerasData.reducer(state, {
        type: fetchCamerasAction.fulfilled.type, payload: {
          data: mockCameras, camerasTotalCount: MOCK_CAMERAS_TOTAL_COUNT
        }
      })).toEqual({
        ...state,
        cameras: mockCameras,
        camerasLoadingStatus: LoadingStatus.Fulfilled,
        camerasTotalCount: MOCK_CAMERAS_TOTAL_COUNT,
      });
    });

    it('should update camerasLoadingStatus to pending if fetchCamerasAction pending', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.pending.type}))
        .toEqual({
          ...state,
          camerasLoadingStatus: LoadingStatus.Pending,
        });
    });

    it('should update camerasLoadingStatus to rejected if fetchCamerasAction rejected', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.rejected.type}))
        .toEqual({
          ...state,
          camerasLoadingStatus: LoadingStatus.Rejected,
        });
    });
  });

  describe('fetchCameraAction test', () => {
    it('should update camera and cameraLoadingStatus by load camera', () => {
      expect(camerasData.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: mockCamera}))
        .toEqual({
          ...state,
          camera: mockCamera,
          cameraLoadingStatus: LoadingStatus.Fulfilled,
        });
    });

    it('should update cameraLoadingStatus to pending if fetchCameraAction pending', () => {
      expect(camerasData.reducer(state, {type: fetchCameraAction.pending.type}))
        .toEqual({
          ...state,
          cameraLoadingStatus: LoadingStatus.Pending,
        });
    });

    it('should update cameraLoadingStatus to rejected if fetchCameraAction rejected', () => {
      expect(camerasData.reducer(state, {type: fetchCameraAction.rejected.type}))
        .toEqual({
          ...state,
          cameraLoadingStatus: LoadingStatus.Rejected,
        });
    });
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('should update similarCameras by load similarCameras', () => {
      expect(camerasData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: mockCameras}))
        .toEqual({
          ...state,
          similarCameras: mockCameras,
        });
    });
  });

  describe('fetchCamerasBySearchAction test', () => {
    it('should update searchCameras by load searchCameras', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasBySearchAction.fulfilled.type, payload: mockSearchCameras}))
        .toEqual({
          ...state,
          searchCameras: mockSearchCameras,
        });
    });
  });

  describe('fetchCamerasPriceRangeAction test', () => {
    it('should update camerasPriceRange by load camerasPriceRange', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasPriceRangeAction.fulfilled.type, payload: mockCamerasPriceRange}))
        .toEqual({
          ...state,
          camerasPriceRange: mockCamerasPriceRange,
        });
    });
  });

  describe('sendCouponAction test', () => {
    it('should update discount and discountSendingStatus by send coupon', () => {
      expect(camerasData.reducer(state, {
        type: sendCouponAction.fulfilled.type, payload: 35
      })).toEqual({
        ...state,
        discount: 35,
        discountSendingStatus: LoadingStatus.Fulfilled,
      });
    });

    it('should update discountSendingStatus to pending if sendCouponAction pending', () => {
      expect(camerasData.reducer(state, {
        type: sendCouponAction.pending.type
      }))
        .toEqual({
          ...state,
          discountSendingStatus: LoadingStatus.Pending,
        });
    });

    it('should update discountSendingStatus to rejected if sendCouponAction rejected', () => {
      expect(camerasData.reducer(state, {
        type: sendCouponAction.rejected.type
      }))
        .toEqual({
          ...state,
          discountSendingStatus: LoadingStatus.Rejected,
        });
    });
  });

  describe('sendOrderAction test', () => {
    it('should update discount and orderSendingStatus if sendOrderAction fulfilled', () => {
      expect(camerasData.reducer(state, {
        type: sendOrderAction.fulfilled.type
      })).toEqual({
        ...state,
        discount: 0,
        orderSendingStatus: LoadingStatus.Fulfilled
      });
    });

    it('should update orderSendingStatus if sendOrderAction pending', () => {
      expect(camerasData.reducer(state, {
        type: sendOrderAction.pending.type
      })).toEqual({
        ...state,
        orderSendingStatus: LoadingStatus.Pending
      });
    });

    it('should update orderSendingStatus if sendOrderAction rejected', () => {
      expect(camerasData.reducer(state, {
        type: sendOrderAction.rejected.type
      })).toEqual({
        ...state,
        orderSendingStatus: LoadingStatus.Rejected
      });
    });
  });

  describe('reducers test', () => {
    it('should update camerasInCart when addCameraToCart', () => {
      expect(camerasData.reducer(state, addCameraToCart(mockCamera))).toEqual({
        ...state,
        camerasInCart: [mockCamera],
      });
    });

    it('should update camerasInCart when removeCamerasFromCart', () => {
      expect(camerasData.reducer({
        ...state,
        camerasInCart: [mockCamera, mockCamera]
      }, removeCamerasFromCart(mockCamera)))
        .toEqual({
          ...state,
          camerasInCart: [],
        });
    });

    it('should update camerasInCart when clearCart', () => {
      expect(camerasData.reducer({
        ...state,
        camerasInCart: [mockCamera, mockCamera]
      }, clearCart))
        .toEqual({
          ...state,
          camerasInCart: [],
        });
    });

    it('should update camerasInCart when reduceCameraInCart', () => {
      expect(camerasData.reducer({
        ...state,
        camerasInCart: [mockCamera, mockCamera]
      }, reduceCameraInCart(mockCamera)))
        .toEqual({
          ...state,
          camerasInCart: [mockCamera],
        });
    });

    it('should update camerasInCart when changeCamerasCountInCart', () => {
      expect(camerasData.reducer({
        ...state,
        camerasInCart: [mockCamera, mockCamera]
      }, changeCamerasCountInCart({
        camera: mockCamera,
        camerasCount: 3,
      })))
        .toEqual({
          ...state,
          camerasInCart: [mockCamera, mockCamera, mockCamera],
        });
    });

    it('should update discountSendingStatus when changeCouponSendingStatus', () => {
      expect(camerasData.reducer(state, changeCouponSendingStatus(LoadingStatus.Pending))).toEqual({
        ...state,
        discountSendingStatus: LoadingStatus.Pending,
      });
    });

    it('should update orderSendingStatus when changeOrderSendingStatus', () => {
      expect(camerasData.reducer(state, changeOrderSendingStatus(LoadingStatus.Pending))).toEqual({
        ...state,
        orderSendingStatus: LoadingStatus.Pending,
      });
    });
  });
});
