import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { generatePath } from 'react-router-dom';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { APIRoute, DEFAULT_PAGE, REVIEWS_PER_PAGE } from '../const/const';
import { createAPI } from '../services/api';
import { createRandomCamera, createRandomPostReview, createRandomPromo, createRandomReviews, MOCK_CAMERAS_TOTAL_COUNT, MOCK_REVIEWS_TOTAL_COUNT } from '../tests/mocks/mocks';
import { StateType } from '../types/state-type';
import { CameraType } from '../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarCamerasAction, sendReviewAction } from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);

  it('should dispatch fetchCamerasAction when GET /cameras?_limit=9&_page=:page when "page" - is a page-number', async () => {
    mockAPI
      .onGet(generatePath(APIRoute.Cameras, { page: String(DEFAULT_PAGE) }))
      .reply(200, { data: [] as CameraType[], camerasTotalCount: MOCK_CAMERAS_TOTAL_COUNT }, { 'x-total-count': MOCK_CAMERAS_TOTAL_COUNT });

    const store = mockStore();

    await store.dispatch(fetchCamerasAction({
      currentPage: DEFAULT_PAGE,
      params: {
        sortType:  null,
        orderType:  null,
        category: null,
        level: null,
        maxPrice: null,
        minPrice: null,
        type: null,
      }
    }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchCameraAction and start fetchSimilarCamerasAction when GET /cameras/:id when "id" - is a camera id', async () => {
    const mockCamera = createRandomCamera();

    mockAPI
      .onGet(generatePath(APIRoute.Camera, { id: String(mockCamera.id) }))
      .reply(200, mockCamera);

    const store = mockStore();

    await store.dispatch(fetchCameraAction(String(mockCamera.id)));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      fetchSimilarCamerasAction.pending.type,
      fetchCameraAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchSimilarCamerasAction when GET "/cameras/:id/similar" when "id" - is a camera id', async () => {
    const mockCamera = createRandomCamera();
    const mockSimilarCameras = [createRandomCamera(), createRandomCamera(), createRandomCamera()];

    mockAPI
      .onGet(generatePath(APIRoute.SimilarCameras, { id: String(mockCamera.id) }))
      .reply(200, mockSimilarCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(String(mockCamera.id)));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /cameras/:id/reviews?_sort=createAt&_order=desc&_end=:count when "id" - is a camera id and "count" - is a reviews count', async () => {
    const mockCamera = createRandomCamera();
    const mockReviews = createRandomReviews();

    mockAPI
      .onGet(generatePath(APIRoute.Reviews, { id: String(mockCamera.id), count: String(REVIEWS_PER_PAGE) }))
      .reply(200, { data: mockReviews, reviewsTotalCount: MOCK_REVIEWS_TOTAL_COUNT }, { 'x-total-count': MOCK_REVIEWS_TOTAL_COUNT });

    const store = mockStore();

    await store.dispatch(fetchReviewsAction({ id: mockCamera.id, count: REVIEWS_PER_PAGE }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should dispatch sendReviewAction when POST /comments/:id', async () => {
    const mockReview = createRandomPostReview();

    mockAPI
      .onPost(APIRoute.PostReview)
      .reply(200, []);

    const store = mockStore();

    await store.dispatch(sendReviewAction(mockReview));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchPromoAction when GET /promo', async () => {
    const mockPromo = createRandomPromo();

    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });
});
