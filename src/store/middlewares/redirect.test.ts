import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {AppRoute} from '../../const/const';
import {StateType} from '../../types/state-type';
import {redirectToRoute} from '../action';
import {redirect} from './redirect';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<StateType, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /*', () => {
    store.dispatch(redirectToRoute(AppRoute.NotFound));
    expect(fakeHistory.location.pathname).toBe(AppRoute.NotFound);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NotFound),
    ]);
  });

  it('should not to be redirect /catalog because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.CatalogPage});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.CatalogPage);
  });
});
