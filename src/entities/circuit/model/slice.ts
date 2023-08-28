import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITranslateCoords } from '@/shared/model/types';
import { circuitApi } from '..';
import { CircuitData } from '../api/types';

interface ICircuitSliceState {
  scale: number;
  translateCoords: ITranslateCoords;
  gridStep: number;
  isGridVisible: boolean;

  _id: string | null;
  name: string;
  updatedAt: string | null;
}

const initialState: ICircuitSliceState = {
  name: '',
  _id: null,
  scale: 1,
  translateCoords: {
    translateX: 0,
    translateY: 0,
  },
  gridStep: 30,
  isGridVisible: false,
  updatedAt: null,
};

export const circuitSlice = createSlice({
  name: 'circuit',
  initialState,
  reducers: {
    setScale(state, action: PayloadAction<number>) {
      state.scale = action.payload;
    },
    setTranslateCoords(state, action: PayloadAction<ITranslateCoords>) {
      state.translateCoords = action.payload;
    },
    toggleIsGridVisible(state) {
      state.isGridVisible = !state.isGridVisible;
    },
    setCircuitName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    resetCircuitData: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        circuitApi.endpoints.getCircuitData.matchFulfilled,
        (state, { payload }: PayloadAction<CircuitData>) => {
          const { name, updatedAt, _id } = payload;
          state.name = name;
          state._id = _id;
          state.updatedAt = updatedAt;
        }
      )
      .addMatcher(
        circuitApi.endpoints.updateCircuit.matchFulfilled,
        (state, { payload }: PayloadAction<CircuitData>) => {
          const { updatedAt } = payload;
          state.updatedAt = updatedAt;
        }
      );
  },
});

export const {
  setScale,
  setTranslateCoords,
  resetCircuitData,
  toggleIsGridVisible,
  setCircuitName,
} = circuitSlice.actions;
