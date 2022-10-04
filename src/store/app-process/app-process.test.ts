import { DEFAULT_PAGE } from '../../const/const';
import { appProcess, changeCurrentPage } from './app-process';

describe('Reducer: appProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentPage: DEFAULT_PAGE,
      });
  });

  it('should update current page when the page is changed', () => {
    const state = {
      currentPage: DEFAULT_PAGE,
    };
    expect(appProcess.reducer(state, changeCurrentPage(5)))
      .toEqual({
        currentPage: 5,
      });
  });
});