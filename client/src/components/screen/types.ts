import React from 'react';

type viewport = 'extra small' | 'small' | 'medium' | 'large' | 'extra large';

export interface ScreenProps {
  children: React.ReactNode;

  /**
   * If ``true``, the parent tag will be a ``span``, otherwise, it will be a ``div``
   */
  inline?: boolean;

  from: viewport;

  /**
   * An upper boundary for the element.
   * For example, if the lower boundary is ``small`` and this prop is ``large``,
   * the element will be shown only in the range of 640px (inclusive) and 1440px (not inclusive)
   *
   * Passing the same viewport as the screen's lower boundary is the same as not
   * specifying this prop.
   */
  to?: viewport;
}

export interface ViewportScreenProps
  extends Pick<ScreenProps, Exclude<keyof ScreenProps, 'from'>> {}
