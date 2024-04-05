import { renderHook } from '@testing-library/react';
import { useInit } from './useInit';

describe('useInit', () => {
  it('Invokes the callback only the first time', () => {
    const testFn = jest.fn();
    const init = renderHook(() => useInit(testFn)).result.current;
    init();
    init();

    expect(testFn).toHaveBeenCalledTimes(1);
  });
});
