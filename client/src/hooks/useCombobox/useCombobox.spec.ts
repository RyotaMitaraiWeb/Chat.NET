import { act, renderHook } from '@testing-library/react';
import { useCombobox } from './useCombobox';

type CreateEventOptions = {
  code?: string;
  altKey?: boolean;
};

function createEvent(key: string, options?: CreateEventOptions): React.KeyboardEvent {
  return { key, code: options?.code || '', altKey: options?.altKey } as React.KeyboardEvent;
}

const enterEvent = createEvent('Enter');
const escapeEvent = createEvent('Escape');
const tabEvent = createEvent('Tab');
const spaceEvent = createEvent(' ', { code: 'Space' });
const pageUpEvent = createEvent('PageUp');
const pageDownEvent = createEvent('PageDown');
const homeEvent = createEvent('Home');
const endEvent = createEvent('End');
const arrowUpEvent = createEvent('ArrowUp');
const arrowDownEvent = createEvent('ArrowDown');
const arrowDownAltEvent = createEvent('ArrowDown', { altKey: true });
const arrowUpAltEvent = createEvent('ArrowUp', { altKey: true });

const fn = jest.fn();

const memberStates = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
];

describe('useCombobox', () => {
  beforeEach(() => jest.useFakeTimers());

  describe('Opening and closing', () => {
    it('Opens and closes when Enter is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Austria', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.handleKeyPress(enterEvent));
      expect(hook.current.open).toBe(true);

      act(() => hook.current.handleKeyPress(enterEvent));
      expect(hook.current.open).toBe(false);
    });

    it('Opens and closes when Space is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Austria', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.handleKeyPress(spaceEvent));
      expect(hook.current.open).toBe(true);

      act(() => hook.current.handleKeyPress(spaceEvent));
      expect(hook.current.open).toBe(false);
    });

    it('Opens when Home is pressed and correctly selects the first value', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.handleKeyPress(homeEvent));
      expect(hook.current.open).toBe(true);
      expect(hook.current.focusedValue).toBe('Austria');
    });

    it('Opens when End is pressed and correctly selects the last value', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.handleKeyPress(endEvent));
      expect(hook.current.open).toBe(true);
      expect(hook.current.focusedValue).toBe('Sweden');
    });

    it('Closes when Tab is pressed and correctly selects the focused value', () => {
      const fn = jest.fn();
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.setFocusedValue('Bulgaria'));
      act(() => hook.current.handleKeyPress(tabEvent));

      expect(hook.current.open).toBe(false);
      expect(hook.current.focusedValue).toBe('Bulgaria');
    });

    it('Opens when ArrowDown is pressed (regardless of Alt key)', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.handleKeyPress(arrowDownEvent));
      expect(hook.current.open).toBe(true);

      act(() => hook.current.setOpen(false));

      act(() => hook.current.handleKeyPress(arrowDownAltEvent));
      expect(hook.current.open).toBe(true);
    });

    it('Opens when a printable character is pressed and selects the correct value', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.handleKeyPress(createEvent('b')));
      act(() => jest.advanceTimersByTime(300));

      expect(hook.current.open).toBe(true);
      expect(hook.current.focusedValue).toBe('Belgium');
    });

    it('Closes when Escape is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(escapeEvent));

      expect(hook.current.open).toBe(false);
    });

    it('Opens when ArrowUp is pressed and closes when altKey is held', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.handleKeyPress(arrowUpEvent));
      expect(hook.current.open).toBe(true);

      // Make sure that merely pressing the arrow up key does not trigger a closing
      act(() => hook.current.handleKeyPress(arrowUpEvent));
      expect(hook.current.open).toBe(true);

      act(() => hook.current.handleKeyPress(arrowUpAltEvent));
      expect(hook.current.open).toBe(false);
    });
  });

  describe('Selecting and navigating options', () => {
    it('Moves to the next option when ArrowDown is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(arrowDownEvent));

      expect(hook.current.focusedValue).toBe('Netherlands');
    });

    it('Does not change selection when ArrowDown is pressed and is at last option', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Sweden', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(arrowDownEvent));

      expect(hook.current.focusedValue).toBe('Sweden');
    });

    it('Moves to the next option when ArrowUp is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Malta', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(arrowUpEvent));

      expect(hook.current.focusedValue).toBe('Luxembourg');
    });

    it('Does not change selection when ArrowUp is pressed and is at first option', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Austria', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(arrowUpEvent));

      expect(hook.current.focusedValue).toBe('Austria');
    });

    it('Changes to the first option when Home is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Spain', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(homeEvent));

      expect(hook.current.focusedValue).toBe('Austria');
    });

    it('Changes to the last option when End is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Belgium', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(endEvent));

      expect(hook.current.focusedValue).toBe('Sweden');
    });

    it('Goes ten options ahead when PageDown is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Austria', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(pageDownEvent));

      expect(hook.current.focusedValue).toBe(memberStates[10]);
    });

    it('Goes to the last option when PageDown is pressed and index + 10 > options', () => {
      const hook = renderHook(() =>
        useCombobox({ value: memberStates[18], values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(pageDownEvent));

      expect(hook.current.focusedValue).toBe('Sweden');
    });

    it('Goes ten options behind when PageUp is pressed', () => {
      const hook = renderHook(() =>
        useCombobox({ value: memberStates[12], values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(pageUpEvent));

      expect(hook.current.focusedValue).toBe('Bulgaria');
    });

    it('Goes to the first option when PageUp is pressed and index < 10', () => {
      const hook = renderHook(() =>
        useCombobox({ value: memberStates[9], values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.handleKeyPress(pageUpEvent));

      expect(hook.current.focusedValue).toBe('Austria');
    });

    it(`Correctly selects a value when multiple keys are pressed in quick succession 
      (case insensitive)`, () => {
      const hook = renderHook(() =>
        useCombobox({ value: 'Belgium', values: memberStates, onChange: fn }),
      ).result;

      const l = createEvent('l');
      const u = createEvent('u');

      act(() => hook.current.handleKeyPress(l));
      expect(hook.current.focusedValue).toBe('Latvia');

      act(() => hook.current.handleKeyPress(u));
      expect(hook.current.handleKeyPress(u));
      expect(hook.current.focusedValue).toBe('Luxembourg');
    });

    it('Selects the focused option when alt + ArrowUp is pressed', () => {
      const fn = jest.fn();
      const hook = renderHook(() =>
        useCombobox({ value: 'Belgium', values: memberStates, onChange: fn }),
      ).result;

      act(() => hook.current.setOpen(true));
      act(() => hook.current.setFocusedValue('Bulgaria'));
      act(() => hook.current.handleKeyPress(arrowUpAltEvent));

      expect(fn).toHaveBeenCalledWith('Bulgaria');
    });
  });
});
