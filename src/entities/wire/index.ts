export {
  addWire,
  endWireToElement,
  removeDrawingWire,
  removeWireById,
  setDrawingWire,
  startWire,
  startWireFromElement,
  updateDrawingWireCoords,
  updateWireById,
  wireSlice,
  updatedWiresCoordsByCirElement,
} from './model/slice';
export type { ICirWire } from './model/types';
export { Wire } from './ui/Wire.tsx';
