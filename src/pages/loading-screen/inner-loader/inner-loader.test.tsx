import { screen } from '@testing-library/react';
import { renderTestApp } from '../../../tests/render-test-app';
import InnerLoader from './inner-loader';

describe('Component: InnerLoader', () => {
  it('should render correctly', () => {
    renderTestApp(<InnerLoader />, {});

    expect(screen.getByTestId('inner-loader')).toBeInTheDocument();
  });
});
