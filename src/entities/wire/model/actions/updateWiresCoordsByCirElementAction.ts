import { AppDispatch, RootState } from '@/app/appStore';
import { ICirElement } from '@/entities/cirElement/model/types';
import { getUpdatedWireCoordsListByCirElement } from "./getUpdatedWireCoordsListByCirElement";
import { updateWireById } from "../slice";

// TODO: remove
export const updateWiresCoordsByCirElementAction =
  (cirElement: ICirElement) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      node: { nodes },
      wire: { wires },
    } = getState();

   getUpdatedWireCoordsListByCirElement({cirElement, nodes, wires}).forEach(wire => dispatch(updateWireById({id: wire.id, updatedWire: wire})));
  };
