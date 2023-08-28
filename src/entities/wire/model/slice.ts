import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { circuitApi } from '@/entities/circuit/api/api';
import { CircuitData } from '@/entities/circuit/api/types';
import { getWiresFromCircuitData } from '../lib/getWiresFromCircuitData';
import { ICirWire } from './types';

interface IWireSliceState {
  drawingWire: ICirWire | null;
  wires: ICirWire[];
  selectedWireId: string | null;
}

const initialState: IWireSliceState = {
  drawingWire: null,
  wires: [],
  selectedWireId: null,
};

export const wireSlice = createSlice({
  name: 'wire',
  initialState,
  reducers: {
    setWires(state, action: PayloadAction<ICirWire[]>) {
      state.wires = action.payload;
    },
    setDrawingWire(state, action: PayloadAction<ICirWire | null>) {
      state.drawingWire = action.payload;
    },
    addWire(state, action: PayloadAction<ICirWire>) {
      state.wires.push(action.payload);
    },
    updateWireById(
      state,
      action: PayloadAction<{
        id: string;
        updatedWire: ICirWire;
      }>
    ) {
      const { id, updatedWire } = action.payload;
      const index = state.wires.findIndex((element) => element.id === id);
      if (index !== -1) {
        state.wires[index] = updatedWire;
      }
    },
    removeWireById(state, action: PayloadAction<string>) {
      state.wires = state.wires.filter((wire) => wire.id !== action.payload);
    },
    setSelectedWireId(state, action: PayloadAction<string | null>) {
      state.selectedWireId = action.payload;
    },
    resetWireData: () => initialState,
  },
  extraReducers(builder) {
    builder.addMatcher(
      circuitApi.endpoints.getCircuitData.matchFulfilled,
      (state, { payload }: PayloadAction<CircuitData>) => {
        const wires = getWiresFromCircuitData(payload);
        state.wires = wires;
      }
    );
  },
});

export const {
  setWires,
  setDrawingWire,
  addWire,
  updateWireById,
  removeWireById,
  setSelectedWireId,
  resetWireData,
} = wireSlice.actions;
