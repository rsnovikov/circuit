import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/api';
import { IAuthRequestResponse } from '../api/types';

type AuthSliceState =
  | { isAuthorized: true; accessToken: string; userId: string; email: string }
  | { isAuthorized: false; accessToken?: string; userId?: string; email?: string };

const initialState: AuthSliceState = { isAuthorized: false };

const authorizeReducer = (
  state: AuthSliceState,
  { payload }: PayloadAction<IAuthRequestResponse>
) => {
  state.isAuthorized = true;

  if (state.isAuthorized) {
    const { accessToken, userId, email } = payload;

    state.accessToken = accessToken;
    state.userId = userId;
    state.email = email;
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthData: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, authorizeReducer)
      .addMatcher(authApi.endpoints.register.matchFulfilled, authorizeReducer);
  },
});

export const { resetAuthData } = authSlice.actions;
