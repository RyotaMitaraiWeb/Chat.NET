import { BaseButtonProps } from '@/components/types/BaseButton';
import { BaseListItemProps } from '@/components/types/BaseListItem';

export interface ListItemButtonProps extends BaseListItemProps, BaseButtonProps {
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
}