import { AppDispatch } from '@/app/appStore';
import { CircuitData } from '@/entities/circuit/api/types';
import { getWiresFromCircuitData } from '../../lib/getWiresFromCircuitData';
import { setWires } from '../slice';

export const createWiresFromCircuitDataAction =
  (circuitData: CircuitData) => (dispatch: AppDispatch) => {
    const wires = getWiresFromCircuitData(circuitData);
    dispatch(setWires(wires));
  };
