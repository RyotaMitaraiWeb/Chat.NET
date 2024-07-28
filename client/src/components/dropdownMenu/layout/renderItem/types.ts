export interface DropdownRenderItemProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  value: string;
  focusedValue: string;
  currentValue?: string;
  children: React.ReactNode;
}
