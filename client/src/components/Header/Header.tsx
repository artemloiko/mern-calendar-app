import React, { ReactElement } from 'react';
import { Link } from '@reach/router';

import './Header.css';

type HeaderProps = {
  controls?: ReactElement | ReactElement[];
};

const Header: React.FC<HeaderProps> = (props) => {
  const { controls } = props;

  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__heading">
          <Link to="/" className="header__heading-link">
            MERN Calendar app
          </Link>
        </h1>
        <div className="header__control-group">{controls}</div>
      </div>
    </header>
  );
};

export default Header;
