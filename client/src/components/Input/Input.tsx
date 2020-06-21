import React, { useRef } from 'react';
import clsx from 'clsx';

import './Input.css';

type InputProps = React.HTMLProps<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  const { className, ...inputProps } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx('input', className)}>
      <input {...inputProps} className="input__text" ref={inputRef} />
    </div>
  );
};

export default Input;
