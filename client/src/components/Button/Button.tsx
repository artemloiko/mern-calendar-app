import React, { ReactChild } from 'react';
import clsx from 'clsx';

import './Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactChild;
  className?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, ...restProps } = props;
  return (
    <button {...restProps} className={clsx('button', className)}>
      <div className="button__text">{children}</div>
    </button>
  );
};

export default Button;
