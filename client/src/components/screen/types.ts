import React from 'react';

type viewport = 'extra small' | 'small' | 'medium' | 'large' | 'extra large';

export interface ScreenProps {
  children: React.ReactNode;
  inline?: boolean;
  from: viewport;
  to?: viewport;
}

export interface ViewportScreenProps
  extends Pick<ScreenProps, Exclude<keyof ScreenProps, 'from'>> {}
