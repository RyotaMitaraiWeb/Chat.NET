import { BaseButtonProps } from '@/components/types/BaseButton';
import React from 'react';

export interface ChipBodyProps extends BaseButtonProps {
  clickable?: boolean;
  startIcon?: React.ReactNode;
  onKeyUp?: (event: React.KeyboardEvent) => void;
}
