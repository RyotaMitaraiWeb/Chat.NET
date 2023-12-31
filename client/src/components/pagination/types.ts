import { ElementProps } from '../types/Element';

export interface PaginationProps extends ElementProps {
  count?: number;

  onChangePage?: (value: number) => void;

  /**
   * Turns the component into a controlled one.
   */
  page?: number;

  showNext?: boolean;
  showPrev?: boolean;

  disabled?: boolean;

  /**
   * This will convert all pages to hyperlinks (using Next's ``Link`` component)
   */
  urls?: string[];
}
