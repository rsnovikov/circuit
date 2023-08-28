import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/appStore';

const selectWires = (state: RootState) => state.wire.wires;

export const selectWiresData = createSelector([selectWires], (state) =>
  state.map(({ id, startNodeId, endNodeId, color }) => ({ id, startNodeId, endNodeId, color }))
);
