import React, { ReactElement } from 'react';

import './Header.css';

type HeaderProps = {
  controls?: ReactElement | ReactElement[];
};

const Header: React.FC<HeaderProps> = (props) => {
  const { controls } = props;

  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__heading">MERN Calendar app</h1>
        <div className="header__control-group">{controls}</div>
      </div>
    </header>
  );
};

export default Header;
