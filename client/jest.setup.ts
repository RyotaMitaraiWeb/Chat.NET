import '@testing-library/jest-dom';

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
  window.matchMedia = jest.fn();
});

afterEach(() => {
  jest.clearAllTimers();
});
