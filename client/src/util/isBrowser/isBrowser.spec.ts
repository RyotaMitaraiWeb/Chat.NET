import { isBrowser } from './isBrowser';

describe('isBrowser', () => {
  it('Returns false if at least one query selector is not present', () => {
    document.body.appendChild(document.createElement('p'));
    expect(isBrowser('h1')).toBe(false);
    expect(isBrowser('p', 'h1')).toBe(false);
  });

  it('Returns true if window and query selectors are available', () => {
    document.body.appendChild(document.createElement('p'));
    document.body.appendChild(document.createElement('h1'));

    expect(isBrowser()).toBe(true);
    expect(isBrowser('h1')).toBe(true);
    expect(isBrowser('p', 'h1')).toBe(true);
  });
});
