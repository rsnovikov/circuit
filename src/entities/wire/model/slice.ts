import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/app/appStore';
import { IBreadboardCirElement } from '@/entities/breadboard/model/types';
import { ICirNode, addNode, updateNodeById } from '@/entities/node';
import { degreesToRadians } from '@/shared/lib/degreesToRadians';
import { roundTo } from '@/shared/lib/roundTo';
import { removeSelectedEntities } from '@/shared/model/actions';
import { ICirWireData, ICoords } from '@/shared/model/types';
import { transformCoords } from '@/widgets/Breadboard/lib/transformCoords';
import { getRelatedNodeAbsoluteCoords } from '../lib/getRelatedNodeAbsoluteCoords';
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
  },
});

export const {
  setWires,
  setDrawingWire,
  addWire,
  updateWireById,
  removeWireById,
  setSelectedWireId,
} = wireSlice.actions;

export const startWire =
  ({ startNodeId, x1, y1 }: { startNodeId: string; x1: number; y1: number }) =>
  (dispatch: AppDispatch) => {
    const wire: ICirWire = {
      id: nanoid(),
      x1: x1,
      y1: y1,
      x2: x1,
      y2: y1,
      startNodeId,
      endNodeId: null,
      color: 'green',
    };
    dispatch(setDrawingWire(wire));
  };

export const startWireFromElement =
  ({ elementId, terminalId }: { elementId: string; terminalId: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      breadboard: { elements },
      node: { nodes },
    } = getState();
    const startNode = nodes.find(
      (node) =>
        node.relatedElement?.elementId === elementId &&
        node.relatedElement?.terminalId === terminalId
    );
    const element = elements.find((element) => element.id === elementId);
    if (!startNode || !element) return;

    dispatch(
      startWire({
        startNodeId: startNode.id,
        x1: element.x + startNode.x,
        y1: element.y + startNode.y,
      })
    );
  };

export const endWireToElement =
  ({ elementId, terminalId }: { elementId: string; terminalId: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      breadboard: { elements },
      node: { nodes },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;

    const endNode = nodes.find(
      (node) =>
        node.relatedElement?.elementId === elementId &&
        node.relatedElement?.terminalId === terminalId
    );
    const startNode = nodes.find((node) => node.id === drawingWire?.startNodeId);
    const element = elements.find((element) => element.id === elementId);

    if (!endNode || !element || !startNode) return;

    const updatedStartNode: ICirNode = {
      ...startNode,
      connectionIds: [...startNode.connectionIds, endNode.id],
    };
    dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));

    const updatedEndNode: ICirNode = {
      ...endNode,
      connectionIds: [...endNode.connectionIds, startNode.id],
    };
    dispatch(updateNodeById({ id: updatedEndNode.id, updatedNode: updatedEndNode }));

    const newWire: ICirWire = {
      ...drawingWire,
      endNodeId: endNode.id,
      x2: endNode.x + element.x,
      y2: endNode.y + element.y,
    };
    dispatch(addWire(newWire));

    dispatch(setDrawingWire(null));
  };

export const startWireFromNode =
  (startNodeId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { nodes } = getState().node;
    const startNode = nodes.find((node) => node.id === startNodeId);

    if (!startNode) return;

    dispatch(
      startWire({
        startNodeId: startNode.id,
        x1: startNode.x,
        y1: startNode.y,
      })
    );
  };

// todo: join endWireToNode and endWireToElement
export const endWireToNode =
  (endNodeId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      node: { nodes },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;
    const startNode = nodes.find((node) => node.id === drawingWire.startNodeId);
    const endNode = nodes.find((node) => node.id === endNodeId);

    if (!startNode || !endNode) return;

    const updatedStartNode: ICirNode = {
      ...startNode,
      connectionIds: [...startNode.connectionIds, endNode.id],
    };
    dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));

    const updatedEndNode: ICirNode = {
      ...endNode,
      connectionIds: [...endNode.connectionIds, startNode.id],
    };
    dispatch(updateNodeById({ id: updatedEndNode.id, updatedNode: updatedEndNode }));

    const newWire: ICirWire = {
      ...drawingWire,
      endNodeId: endNode.id,
      x2: endNode.x,
      y2: endNode.y,
    };
    dispatch(addWire(newWire));
  };

export const updateDrawingWireCoords =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      breadboard: { scale, translateCoords },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;
    const { x: x2, y: y2 } = transformCoords({ x, y, scale, translateCoords });

    const updatedDrawingWire: ICirWire = {
      ...drawingWire,
      x2,
      y2,
    };
    dispatch(setDrawingWire(updatedDrawingWire));
  };

export const removeDrawingWire = () => (dispatch: AppDispatch) => {
  dispatch(setDrawingWire(null));
};

export const confirmWireAndAddNode =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      breadboard: { scale, translateCoords, gridStep },
      node: { nodes },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;

    const startNode = nodes.find((node) => node.id === drawingWire.startNodeId);
    if (!startNode) return;

    const { x: transformedX, y: transformedY } = transformCoords({ x, y, scale, translateCoords });

    const roundedX = roundTo(transformedX, gridStep);
    const roundedY = roundTo(transformedY, gridStep);

    const endNode: ICirNode = {
      id: nanoid(),
      x: roundedX,
      y: roundedY,
      connectionIds: [drawingWire.startNodeId],
      relatedElement: null,
    };

    const updatedWire: ICirWire = {
      ...drawingWire,
      endNodeId: endNode.id,
      x2: roundedX,
      y2: roundedY,
    };

    const updatedStartNode: ICirNode = {
      ...startNode,
      connectionIds: [...startNode.connectionIds, endNode.id],
    };

    dispatch(addNode(endNode));
    dispatch(addWire(updatedWire));
    dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));
    dispatch(startWire({ x1: roundedX, y1: roundedY, startNodeId: endNode.id }));
  };

// todo: remove
export const updateWiresCoordsByCirElement =
  (cirElement: IBreadboardCirElement) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      node: { nodes },
      wire: { wires },
    } = getState();
    // todo: optimize iterables, maybe add field relatedElement to wire
    const elementNodes = nodes.filter((node) => node.relatedElement?.elementId === cirElement.id);
    // todo: refactor this trash!
    const cos = Math.round(Math.cos(degreesToRadians(cirElement.rotate)));
    const sin = Math.round(Math.sin(degreesToRadians(cirElement.rotate)));
    wires
      .filter((wire) =>
        elementNodes.some((node) => node.id === wire.startNodeId || node.id === wire.endNodeId)
      )
      .forEach((wire) => {
        const endNode = elementNodes.find((node) => node.id === wire.endNodeId);
        // todo: remove duplicated code segments
        if (endNode) {
          const updatedWire: ICirWire = {
            ...wire,
            x2: cirElement.x + (cos !== 0 ? endNode.x * cos : endNode.y * sin),
            y2: cirElement.y + (cos !== 0 ? endNode.y * cos : -endNode.x * sin),
          };
          dispatch(updateWireById({ id: updatedWire.id, updatedWire }));
        } else {
          const startNode = elementNodes.find((node) => node.id === wire.startNodeId);
          if (!startNode) return;

          const updatedWire: ICirWire = {
            ...wire,
            x1: cirElement.x + (cos !== 0 ? startNode.x * cos : startNode.y * sin),
            y1: cirElement.y + (cos !== 0 ? startNode.y * cos : -startNode.x * sin),
          };
          dispatch(updateWireById({ id: updatedWire.id, updatedWire }));
        }
      });
  };

export const updateWiresCoordsByNode =
  (node: ICirNode) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { wires } = getState().wire;

    wires
      .filter((wire) => node.id === wire.startNodeId || node.id === wire.endNodeId)
      .forEach((wire) => {
        const updatedWire = { ...wire };
        if (wire.endNodeId === node.id) {
          updatedWire.x2 = node.x;
          updatedWire.y2 = node.y;
        } else {
          updatedWire.x1 = node.x;
          updatedWire.y1 = node.y;
        }
        dispatch(updateWireById({ id: updatedWire.id, updatedWire }));
      });
  };

export const addSelectedWireId =
  (wireId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { wires } = getState().wire;
    const selectedWire = wires.find((wire) => wire.id === wireId);
    if (!selectedWire) return;
    dispatch(removeSelectedEntities());
    dispatch(setSelectedWireId(selectedWire.id));
  };

export const removeSelectedWireId = () => (dispatch: AppDispatch) => {
  dispatch(setSelectedWireId(null));
};

export const removeSelectedWire = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const {
    wire: { selectedWireId, wires },
    node: { nodes },
  } = getState();
  const selectedWire = wires.find((wire) => wire.id === selectedWireId);
  if (!selectedWire) return;
  const startNode = nodes.find((node) => node.id === selectedWire.startNodeId);
  const endNode = nodes.find((node) => node.id === selectedWire.endNodeId);
  if (!startNode || !endNode) return;

  const updatedStartNode: ICirNode = {
    ...startNode,
    connectionIds: startNode.connectionIds.filter((connectionId) => {
      return connectionId !== endNode.id;
    }),
  };
  const updatedEndNode: ICirNode = {
    ...endNode,
    connectionIds: endNode.connectionIds.filter((connectionId) => connectionId !== startNode.id),
  };
  dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));
  dispatch(updateNodeById({ id: updatedEndNode.id, updatedNode: updatedEndNode }));
  dispatch(removeWireById(selectedWire.id));
  dispatch(removeSelectedWireId());
};

export const createWiresFromNodes =
  (wiresData: ICirWireData[]) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      node: { nodes },
      breadboard: { elements },
    } = getState();

    const wires: ICirWire[] = wiresData.reduce((acc, wireData) => {
      const startNode = nodes.find((node) => node.id === wireData.startNodeId);
      const endNode = nodes.find((node) => node.id === wireData.endNodeId);
      if (!startNode || !endNode) return acc;
      const startCoords = getRelatedNodeAbsoluteCoords(startNode, elements);
      const endCoords = getRelatedNodeAbsoluteCoords(endNode, elements);
      if (!startCoords || !endCoords) return acc;

      const { x: x1, y: y1 } = startCoords;

      const { x: x2, y: y2 } = endCoords;

      return [...acc, { ...wireData, x1, y1, x2, y2 }];
    }, [] as ICirWire[]);
    dispatch(setWires(wires));
  };

export const selectWiresData = (state: RootState) =>
  state.wire.wires.map(({ x1, x2, y1, y2, ...rest }) => ({ ...rest }));
