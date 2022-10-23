import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import { DEFAULT_PAGE } from './const/const';
import { store } from './store';
import { fetchCamerasAction, fetchPromoAction } from './store/api-actions';

const urlSearchParams = new URLSearchParams(browserHistory.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

store.dispatch(fetchCamerasAction({
  page: Number(params?.['_page']) || DEFAULT_PAGE,
  sortType: params?.['_sort'],
  orderType: params?.['_order']
}));

store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
