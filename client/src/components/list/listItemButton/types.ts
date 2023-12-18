import { BaseButtonWithIconProps } from '@/components/types/BaseButton';
import { BaseListItemProps } from '@/components/types/BaseListItem';

export interface ListItemButtonProps extends BaseListItemProps, BaseButtonWithIconProps {
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
}
