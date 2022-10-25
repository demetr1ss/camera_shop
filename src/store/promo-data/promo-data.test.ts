import { createRandomPromo } from '../../tests/mocks/mocks';
import { PromoType } from '../../types/types';
import { fetchPromoAction } from '../api-actions';
import { promoData, PromoDataType } from './promo-data';

const mockPromo = createRandomPromo();

describe('Reducer: promo-data', () => {
  let state: PromoDataType;

  beforeEach(() => {
    state = {
      promo: {} as PromoType
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(promoData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras, camerasTotalCount and camerasLoadingStatus by load cameras', () => {
      expect(promoData.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: mockPromo }))
        .toEqual({
          promo: mockPromo
        });
    });
  });
});
