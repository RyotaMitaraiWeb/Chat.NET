import { act, renderHook } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('Returns correct array', () => {
    const pagination = renderHook(() => usePagination(11, 10)).result.current;
    expect(pagination.pages.map((p) => p.page)).toEqual([1, 2]);
  });

  it('Correctly updates the selected page', () => {
    const pagination = renderHook(() => usePagination(11, 10)).result;
    expect(pagination.current.pages[0].isSelected).toBe(true);

    act(() => pagination.current.setPage(2));
    expect(pagination.current.pages[1].isSelected).toBe(true);
  });

  it('Does not update beyond limits', () => {
    const pagination = renderHook(() => usePagination(31, 10)).result;
    act(() => pagination.current.setPage(0));
    expect(pagination.current.pages[0].isSelected).toBe(true);

    act(() => pagination.current.setPage(900000));
    expect(pagination.current.pages[0].isSelected).toBe(true);
  });
});
