import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/Input/Input';
import TextField from 'components/TextField/TextField';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';

import { signUp, authClearError } from 'features/auth/authSlice';
import { RootState } from 'app/store';

type SignUpModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, closeModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signUp({ username, email, password }));
  };

  const handleClose = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    dispatch(authClearError());
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" htmlFor="username">
          <Input
            placeholder="Username"
            id="username"
            type="text"
            required
            pattern="[a-zA-Z0-9]{3,30}"
            title="Only letters or numbers. Min length 3, max 30"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          ></Input>
        </TextField>
        <TextField label="Email" htmlFor="email">
          <Input
            placeholder="example@gmail.com"
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          ></Input>
        </TextField>
        <TextField label="Password" htmlFor="password">
          <Input
            placeholder="Your password"
            id="password"
            type="password"
            required
            minLength={8}
            maxLength={256}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          ></Input>
        </TextField>
        {auth.error && <p className="error-message">{auth.error}</p>}
        <Button disabled={auth.isAuthenticating}>
          {auth.isAuthenticating ? <Spinner /> : 'Sign Up'}
        </Button>
      </form>
    </Modal>
  );
};
export default SignUpModal;
