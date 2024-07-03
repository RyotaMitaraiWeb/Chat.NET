import { BaseButtonProps } from '../types/BaseButton';
import { palette, size } from '../types/options';

export interface ChipProps extends BaseButtonProps {
  onClick?: () => void;

  /**
   * If passed, this will make the chip "deletable". This will add a second
   * button next to the content. The passed function will be
   * triggered if one of those happens:
   * * the aforementioned second button is clicked
   * * the ``Delete`` or ``Backspace`` is pressed when the first button is focused
   * (applicable only for clickable chips).
   *
   * The icon for the delete button can be changed via the ``deleteIcon`` prop.
   */
  onDelete?: () => void;
  deleteIcon?: React.ReactNode;
  variant?: 'fill' | 'outlined';
  color?: palette;

  /**
   * For this to work, the chip must have a defined width (or be contained in
   * a tag with a defined width)
   */
  multiline?: boolean;

  /**
   * The icon is placed before the content
   */

  startIcon?: React.ReactNode;
  size?: size;

  /**
   * This will turn the content into a button.
   *
   * **Note:** Only clickable chips can be turned into hyperlinks. In addition,
   * ``onClick`` handlers are executed only for clickable chips.
   */
  clickable?: boolean;

  /**
   * The label is used for accessibility purposes.
   */
  deleteButtonLabel?: string;
}
