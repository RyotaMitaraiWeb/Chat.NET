/**
 * Props that can be applied to every single component. All of those
 * are optional and are applied to the parent tag of the component.
 */
export interface ElementProps {
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-description'?: string;
  title?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
  lang?: string;
  draggable?: boolean;
}
