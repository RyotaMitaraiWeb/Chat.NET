import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers());

  it('debounces functions successfully', () => {
    const test = jest.fn();
    const debounce = renderHook(() => useDebounce(test, 12000)).result.current;

    for (let i = 0; i < 100; i++) {
      debounce(i);
    }

    act(() => jest.runAllTimers());
    expect(test).toHaveBeenCalledTimes(1);
    expect(test).toHaveBeenCalledWith([99]);
  });
});
