import React from 'react';
import { LoaderProps } from './types';
import Typography from '../typography/Typography';
import './Loader.scss';

function Loader(props: LoaderProps): React.JSX.Element {
  const { text, color, className = '', ...others } = props;
  const Text = LoaderText(text);

  return (
    <div className={`component-loader ${color || 'colorless'} ${className}`} {...others}>
      <div className="spinner"></div>
      <div className="spinner-text">{Text}</div>
    </div>
  );
}

function LoaderText(text?: React.ReactNode): React.JSX.Element {
  if (!text) {
    return <></>;
  }

  if (typeof text === 'string') {
    return <Typography emphasis>{text}</Typography>;
  }

  return <>{text}</>;
}

export default Loader;
