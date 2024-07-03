import { generateVariantClassName } from '@/util/generateVariantClassName/generateVariantClassName';
import { ChipProps } from './types';

export function _generateClassName(props: Partial<ChipProps>): string {
  const variantClassName = generateVariantClassName(props.variant || 'fill');
  const variantColorClassName = props.color
    ? `${variantClassName}-${props.color}`
    : variantClassName;

  const effectsClassName = props.color ? `${props.color}-effects` : '';

  const sizeClassName = `size-${props.size}`;
  const disabledClassName = props.disabled ? 'disabled' : '';
  const clickableClassName = props.clickable ? 'clickable' : '';
  const multilineClassName = props.multiline ? 'multiline' : '';
  const deletableClassName = props.onDelete ? 'deletable' : '';

  return [
    variantColorClassName,
    effectsClassName,
    sizeClassName,
    disabledClassName,
    clickableClassName,
    multilineClassName,
    deletableClassName,
  ]
    .filter((cn) => cn !== '')
    .join(' ');
}
