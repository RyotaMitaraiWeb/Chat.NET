import { ElementProps } from '../types/Element';
import { palette, size } from '../types/options';

export interface TypographyProps extends ElementProps {
  children: React.ReactNode;
  color?: palette;
  size?: size;

  /** Defaults to ``p`` */
  selector?: keyof HTMLElementTagNameMap;

  /** Will use the ``theme-emphasis-text`` styling if ``true``. If a color is passed,
   * this will simply bold it.
   */
  emphasis?: boolean;
}
