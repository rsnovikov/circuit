import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/appStore';

const selectWires = (state: RootState) => state.wire.wires;

export const selectWiresData = createSelector([selectWires], (state) =>
  state.map(({ x1, x2, y1, y2, ...rest }) => ({ ...rest }))
);
