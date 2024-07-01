import { variant } from '@/components/types/options';

type variantClassName = 'background' | 'text' | 'outlined';

const variants: Record<variant, variantClassName> = {
  fill: 'background',
  text: 'text',
  outlined: 'outlined',
};

export function generateVariantClassName(variant: variant): variantClassName {
  return variants[variant];
}
