import React from 'react';
import { ElementProps } from '../types/Element';

export interface TooltipProps extends ElementProps {
  content: React.ReactNode;
  children: React.ReactNode;
}
