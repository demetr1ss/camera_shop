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

store.dispatch(fetchCamerasAction({
  page:
    Number(browserHistory.location?.search.at(-1)) ||
    DEFAULT_PAGE
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
