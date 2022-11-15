import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import {redirect} from './middlewares/redirect';
import {rootReducer} from './root-reducer';

export const api = createAPI();

export const createStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
  preloadedState: initialState
});

export const store = createStore();
