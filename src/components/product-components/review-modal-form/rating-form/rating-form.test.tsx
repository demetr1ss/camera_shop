import HistoryRouter from '../../../history-route/history-route';
import RatingForm from './rating-form';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../tests/mocks/mock-store';

const getInputClassName = jest.fn();
const register = jest.fn();

describe('Component: RatingForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore}>
          <RatingForm
            getInputClassName={getInputClassName}
            isFormDisabled={false}
            ratingRegister={{
              ...register('rating', {
                required: true,
              })
            }}
          />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('rating-form')).toBeInTheDocument();
  });
});
