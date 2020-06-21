import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './Page.css';

type Elements = ReactElement | ReactElement[];

type PageProps = {
  children: ReactNode;
  headerControls?: Elements;
  contentClass?: string;
  headerText?: string;
};

const Page: React.FC<PageProps> = ({ children, contentClass, headerControls, headerText }) => {
  return (
    <div className="page">
      <Header controls={headerControls} />
      <div className={clsx('page__content', contentClass)}>{children}</div>
      <Footer />
    </div>
  );
};

export default Page;
