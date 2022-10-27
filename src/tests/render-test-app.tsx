import { MockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { InitialEntry } from 'history';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { createStore } from '../store';
import HistoryRouter from '../components/history-route/history-route';

const history = createMemoryHistory();

type Options = {
  initialState?: Record<string, unknown>
  initialRoute?: InitialEntry;
  mockStore?: MockStore
}

export const renderTestApp = (component: JSX.Element, { initialRoute = '/', initialState = {}, mockStore }: Options) => {
  const Wrapper = () => (
    <Provider store={mockStore ? mockStore : createStore(initialState)}>
      <HistoryRouter history={history}>
        {component}
      </HistoryRouter>
    </Provider>
  );

  return render(<Wrapper />);
};
