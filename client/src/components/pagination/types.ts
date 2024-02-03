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
   * Allows taking full control of how the page buttons are rendered.
   * The returned element is used as a button, with all necessary class names
   * combined with the general pagination class names and necessary event listeners
   * attached to the returned component.
   *
   * **Note:** this option is only applied to the page numbers; the next and
   * previous buttons are not affected and are currently not configurable.
   * @param page for each page button in the pagination, its number
   * will be passed as an argument to the callback.
   * @returns
   */
  renderItem?: (page?: number) => React.JSX.Element;
}
