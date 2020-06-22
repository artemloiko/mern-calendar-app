import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useModal } from 'hooks/useModal';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import LoginModal from './components/LoginModal/LoginModal';
import SignUpModal from './components/SignUpModal/SignUpModal';

const Home: React.FC<RouteComponentProps> = () => {
  const [isLoginModalOpen, handleLoginModalOpen, handleLoginModalClose] = useModal();
  const [isSignUpModalOpen, handleSignUpModalOpen, handleSignUpModalClose] = useModal();

  return (
    <Page
      contentClass="container"
      headerControls={
        <>
          <Button className="header__control" onClick={handleSignUpModalOpen}>
            Sign Up
          </Button>
          <Button className="header__control" onClick={handleLoginModalOpen}>
            Sing In
          </Button>
        </>
      }
    >
      Please login to continue
      <LoginModal isOpen={isLoginModalOpen} closeModal={handleLoginModalClose}></LoginModal>
      <SignUpModal isOpen={isSignUpModalOpen} closeModal={handleSignUpModalClose}></SignUpModal>
    </Page>
  );
};

export default Home;
