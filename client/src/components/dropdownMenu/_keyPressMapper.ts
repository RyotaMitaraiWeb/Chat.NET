export function _keyPressMapper(event: React.KeyboardEvent, open: boolean) {
  return {
    toggleWithMenuAndSpace: event.key === 'Enter' || event.code === 'Space',
    openWithHome: event.key === 'Home' && !open,
    openWithArrowUp: event.key === 'ArrowUp' && !open,
    openWithArrowDown: event.key === 'ArrowDown' && !open,
    openWithAltArrowDown: event.key === 'ArrowDown' && !open && event.altKey,
    openWithEnd: event.key === 'End' && !open,
    closeWithTab: event.key === 'Tab' && open,
    openWithPrintableCharacters: event.key.length === 1 && event.key.match(/[a-zA-Z0-9]/),
    closeWithEscape: event.key === 'Escape' && open,
  };
}
