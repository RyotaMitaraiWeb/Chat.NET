import { generateVariantClassName } from '@/util/generateVariantClassName/generateVariantClassName';
import { ChipProps } from './types';

export function _generateClassName(props: Partial<ChipProps>): string {
  const variantClassName = generateVariantClassName(props.variant || 'fill');
  const variantColorClassName = props.color
    ? `${variantClassName}-${props.color}`
    : variantClassName;

  const sizeClassName = `size-${props.size}`;
  const disabledClassName = props.disabled ? 'disabled' : '';
  const clickableClassName = props.clickable ? 'clickable' : '';
  const multilineClassName = props.multiline ? 'multiline' : '';

  return [
    variantColorClassName,
    sizeClassName,
    disabledClassName,
    clickableClassName,
    multilineClassName,
  ].join(' ');
}
