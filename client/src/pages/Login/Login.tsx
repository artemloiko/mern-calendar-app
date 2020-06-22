import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useModal } from 'hooks/useModal';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import LoginModal from './components/LoginModal/LoginModal';

const Home: React.FC<RouteComponentProps> = () => {
  const [isLoginModalOpen, handleLoginModalOpen, handleLoginModalClose] = useModal();

  return (
    <Page
      contentClass="container"
      headerControls={
        <>
          <Button className="header__control">Sign Up</Button>
          <Button className="header__control" onClick={handleLoginModalOpen}>
            Sing In
          </Button>
        </>
      }
    >
      Please login to continue
      <LoginModal isOpen={isLoginModalOpen} closeModal={handleLoginModalClose}></LoginModal>
    </Page>
  );
};

export default Home;
