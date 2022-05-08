import state from 'schema/mock.json';
import { createSwap } from '../swap';

describe('swap()', () => {
  it('should return second item at the first index (0, 1)', () => {
    const handler = createSwap(state);
    const swapped = handler(0, 1);

    expect(swapped[0]).toEqual(state[1]);
  });

  it('should do nothing when source or target indices are -1', () => {
    const handler = createSwap(state);
    const swapped = handler(-1, 1);
    expect(swapped).toEqual(state);
  });

  it('should do nothing when source or target indices are greater than list size', () => {
    const handler = createSwap(state);
    const swapped = handler(0, state.length + 1);
    expect(swapped).toEqual(state);
  });
});
