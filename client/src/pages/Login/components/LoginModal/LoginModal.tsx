import React, { useState } from 'react';

import Input from 'components/Input/Input';
import TextField from 'components/TextField/TextField';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import { signIn } from 'features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';

type LoginModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, closeModal }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signIn({ login, password }));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <TextField label="Username or Email" htmlFor="login">
          <Input
            placeholder="Username or email"
            id="login"
            type="text"
            required
            value={login}
            onChange={(e) => setLogin(e.currentTarget.value)}
          ></Input>
        </TextField>
        <TextField label="Password" htmlFor="password">
          <Input
            placeholder="Your password"
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          ></Input>
        </TextField>
        {auth.error && <p className="error-message">{auth.error}</p>}
        <Button disabled={auth.isAuthenticating}>
          {auth.isAuthenticating ? <Spinner /> : 'Sign In'}
        </Button>
      </form>
    </Modal>
  );
};
export default LoginModal;
