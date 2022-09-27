import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { Provider } from 'react-redux';
import { fetchCamerasAction, fetchPromoAction } from './store/api-actions';
import { DEFAULT_PAGE } from './const/const';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchCamerasAction(DEFAULT_PAGE));
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
);
