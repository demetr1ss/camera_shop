import {DEFAULT_PAGE} from '../../const/const';
import {appProcess, AppProcessStateType, setCurrentCatalogPath} from './app-process';

describe('Reducer: appProcess', () => {
  let state: AppProcessStateType;

  beforeEach(() => {
    state = {
      currentCatalogPath: {
        currentPage: DEFAULT_PAGE
      },
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should set current catalog page and search', () => {
    expect(appProcess.reducer(state, setCurrentCatalogPath({
      currentPage: 3,
      search: '?_order=asc'
    })))
      .toEqual({
        ...state,
        currentCatalogPath: {
          currentPage: 3,
          search: '?_order=asc'
        }
      });
  });
});
