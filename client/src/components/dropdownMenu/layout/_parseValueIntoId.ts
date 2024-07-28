export function _parseValueIntoId(value: string): string {
  return value.replace(/ /g, '-');
}
