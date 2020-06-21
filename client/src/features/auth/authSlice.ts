import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import api, { User, SignInDTO, isAxiosError } from 'utils/api';
import { RootState } from 'app/store';

interface AuthState {
  isAuthenticating: boolean;
  error?: string;
  token?: string;
  user?: User;
}

const initialState: AuthState = {
  isAuthenticating: false,
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
  },
});

export default authSlice.reducer;

export const { authRequest, authFail, authSuccess } = authSlice.actions;


export function signIn(
  signInDTO: SignInDTO,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    dispatch(authRequest());
    try {
      const data = await api.signIn(signInDTO);
      dispatch(authSuccess(data));
    } catch (error) {
      console.dir(error);
      let errorMessage = error.message;
      if (isAxiosError(error)) {
        errorMessage = error.response?.data.error?.message || error.message;
      }
      dispatch(authFail(errorMessage));
    }
  };
}
