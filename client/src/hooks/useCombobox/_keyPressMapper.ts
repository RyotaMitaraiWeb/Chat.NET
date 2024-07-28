export function _keyPressMapper(event: React.KeyboardEvent, open: boolean) {
  return {
    toggleWithMenuAndSpace: event.key === 'Enter' || event.code === 'Space',
    openWithHome: event.key === 'Home' && !open,
    openWithArrowUp: event.key === 'ArrowUp' && !open,
    openWithArrowDown: event.key === 'ArrowDown' && !open,
    openWithAltArrowDown: event.key === 'ArrowDown' && !open && event.altKey,
    closeWithAltArrowUp: event.key === 'ArrowUp' && open && event.altKey,
    openWithEnd: event.key === 'End' && !open,
    closeWithTab: event.key === 'Tab' && open,
    openWithPrintableCharacters: event.key.length === 1 && event.key.match(/[a-zA-Z0-9]/),
    closeWithEscape: event.key === 'Escape' && open,
    moveDown: event.key === 'ArrowDown' && open && !event.altKey,
    moveUp: event.key === 'ArrowUp' && open && !event.altKey,
    moveToFirstValue: event.key === 'Home' && open,
    moveToLastValue: event.key === 'End' && open,
    moveTenOptionsAhead: event.key === 'PageDown' && open,
    moveTenOptionsBehind: event.key === 'PageUp' && open,
  };
}
