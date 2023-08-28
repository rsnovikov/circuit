import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/app/appStore';
import { resetAuthData } from '@/entities/auth';
import { authApi } from '@/entities/auth/api/api';
import { resetCircuitData } from '@/entities/circuit';
import { circuitApi } from '@/entities/circuit/api/api';
import { resetNodeData } from '@/entities/node';
import { resetWireData } from '@/entities/wire';

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(resetAuthData());
    dispatch(resetCircuitData());
    dispatch(resetNodeData());
    dispatch(resetWireData());

    dispatch(authApi.util.resetApiState());
    dispatch(circuitApi.util.resetApiState());
  }
);
