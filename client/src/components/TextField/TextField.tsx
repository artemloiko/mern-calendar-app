import React from 'react';
import clsx from 'clsx';

import './TextField.css';

type Props = {
  label: string;
};

type TextFieldProps = Props & React.LabelHTMLAttributes<HTMLLabelElement>;

const TextField: React.FC<TextFieldProps> = (props) => {
  const { htmlFor, label, children, className, ...restProps } = props;

  return (
    <div className={clsx('textfield', className)}>
      <label {...restProps} className="textfield__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default TextField;
