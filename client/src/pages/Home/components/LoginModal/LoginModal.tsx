import React from 'react';

import Input from 'components/Input/Input';
import TextField from 'components/TextField/TextField';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

type LoginModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <form>
        <TextField label="Username or Email" htmlFor="login">
          <Input placeholder="username" id="login" required></Input>
        </TextField>
        <TextField label="Password" htmlFor="password">
          <Input placeholder="password" id="password" required></Input>
        </TextField>
        <Button>Sign In</Button>
      </form>
    </Modal>
  );
};
export default LoginModal;
