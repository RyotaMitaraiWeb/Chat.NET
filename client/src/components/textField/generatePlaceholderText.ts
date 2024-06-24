export function _generatePlaceholderText(
  placeholder: string | undefined,
  required: boolean | undefined,
): string {
  placeholder = placeholder || '';
  if (required) {
    return placeholder + '*';
  }

  return placeholder;
}
