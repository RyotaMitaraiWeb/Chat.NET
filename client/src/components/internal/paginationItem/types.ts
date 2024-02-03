export interface PaginationItemProps {
  page: number;
  disabled?: boolean;
  isSelected: boolean;
  component?: React.JSX.Element;
  onClick: (value: number) => void;
}
