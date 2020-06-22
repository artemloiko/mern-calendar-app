import React, { FunctionComponent } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

type Props = RouteComponentProps & { as: FunctionComponent };

const ProtectedRoute: FunctionComponent<Props> = ({ as: Component, ...props }) => {
  const auth = useSelector((state: RootState) => state.auth);

  const { ...rest } = props;
  return auth.token ? <Component {...rest} /> : <Redirect to="/login" noThrow />;
};

export default ProtectedRoute;
