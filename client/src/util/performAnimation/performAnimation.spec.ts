import { performAnimation } from './performAnimation';

describe('performAnimation', () => {
  const matchMedia = jest.fn();

  const originalMatchMedia = window.matchMedia;
  beforeEach(() => {
    jest.useFakeTimers();

    window.matchMedia = matchMedia as unknown as (query: string) => MediaQueryList;
  });

  it('Performs the callback immediately if the user does not prefer animations', () => {
    const callback = jest.fn();

    matchMedia.mockReturnValueOnce({ matches: false });

    performAnimation(callback, { timeout: 100000000 });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Performs the callback after the specified time if the user does prefer animations', () => {
    const callback = jest.fn();

    matchMedia.mockReturnValueOnce({ matches: true });

    performAnimation(callback, { timeout: 100000000 });
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100000001);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });
});
