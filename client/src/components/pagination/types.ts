import { ElementProps } from '../types/Element';

export interface PaginationProps extends ElementProps {
  totalItems: number;

  /**
   * How many items to display per page
   */
  pageSize?: number;

  onChangePage?: (value: number) => void;

  /**
   * Turns the component into a controlled one.
   */
  page?: number;
}
