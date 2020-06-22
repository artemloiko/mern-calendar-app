import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { navigate } from '@reach/router';
import api, { User, SignInDTO, isAxiosError } from 'utils/api';
import { RootState } from 'app/store';

interface AuthState {
  isAuthenticating: boolean;
  error?: string;
  token?: string;
  user?: User;
}

const readUserFromLS = (): User | undefined => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : undefined;
  } catch (error) {}
};

const initialState: AuthState = {
  isAuthenticating: false,
  token: localStorage.getItem('jwt_token') || undefined,
  user: readUserFromLS(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authRequest(state) {
      state.error = undefined;
      state.isAuthenticating = true;
    },
    authFail(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isAuthenticating = false;
    },
    authSuccess(state, action: PayloadAction<User>) {
      const { payload } = action;
      state.user = payload;
      state.token = payload.accessToken;
      state.isAuthenticating = false;
    },
    authClearError(state) {
      state.error = undefined;
    },
  },
});

export default authSlice.reducer;

export const { authRequest, authFail, authSuccess, authClearError } = authSlice.actions;

export function signIn(
  signInDTO: SignInDTO,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    dispatch(authRequest());
    try {
      const data = await api.signIn(signInDTO);
      localStorage.setItem('jwt_token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(authSuccess(data));
      navigate('/');
    } catch (error) {
      let errorMessage = error.message;
      if (isAxiosError(error)) {
        errorMessage = error.response?.data.error?.message || error.message;
      }
      dispatch(authFail(errorMessage));
    }
  };
}
