import React from 'react';
import { LoaderProps } from './types';
import './Loader.scss';

function Loader(props: LoaderProps): React.JSX.Element {
  const { text, color, size = 'medium', className = '', ...others } = props;
  return (
    <div className={`component-loader ${className}`} {...others}>
      <div className={`spinner ${color || 'colorless'} size-${size}`}></div>
      {text ? <div className={`spinner-text size-${size}`}>{text}</div> : null}
    </div>
  );
}

export default Loader;
