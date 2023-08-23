import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { invalidateTokenAction } from '@/shared/api/invalidateTokenAction';
import { authApi } from '../api/api';
import { ILoginRequestResponse } from '../api/types';

type AuthSliceState =
  | { isAuthorized: true; accessToken: string; userId: string; email: string }
  | { isAuthorized: false; accessToken?: string; userId?: string; email?: string };

const initialState: AuthSliceState = { isAuthorized: false };

const authorizeReducer = (
  state: AuthSliceState,
  { payload }: PayloadAction<ILoginRequestResponse>
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
    clearAuthData(state) {
      state.isAuthorized = false;
      state.accessToken = undefined;
      state.userId = undefined;
      state.email = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(invalidateTokenAction, (state) => {
        state.isAuthorized = false;
        state.accessToken = undefined;
        state.userId = undefined;
        state.email = undefined;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, authorizeReducer)
      .addMatcher(authApi.endpoints.register.matchFulfilled, authorizeReducer);
  },
});

export const { clearAuthData } = authSlice.actions;
