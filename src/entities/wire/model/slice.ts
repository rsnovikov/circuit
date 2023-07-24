import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode, addNode, updateNodeById } from '@/entities/node';
import { ICoords } from '@/shared/model/types';
import { transformCoords } from '@/widgets/Breadboard/lib/transformCoords';
import { ICirWire } from './types';

interface IWireSliceState {
  drawingWire: ICirWire | null;
  wires: ICirWire[];
}

const initialState: IWireSliceState = {
  drawingWire: null,
  wires: [],
};

export const wireSlice = createSlice({
  name: 'wire',
  initialState,
  reducers: {
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
  },
});

export const { setDrawingWire, addWire, updateWireById } = wireSlice.actions;

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

export const addNodeAndConfirmWire =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      breadboard: { scale, translateCoords },
      node: { nodes },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;

    const startNode = nodes.find((node) => node.id === drawingWire.startNodeId);
    if (!startNode) return;

    const { x: transformedX, y: transformedY } = transformCoords({ x, y, scale, translateCoords });

    const endNode: ICirNode = {
      id: nanoid(),
      x: transformedX,
      y: transformedY,
      connectionIds: [drawingWire.startNodeId],
      rotate: 0,
      relatedElement: null,
    };

    const updatedWire: ICirWire = {
      ...drawingWire,
      endNodeId: endNode.id,
      x2: transformedX,
      y2: transformedY,
    };

    const updatedStartNode: ICirNode = {
      ...startNode,
      connectionIds: [...startNode.connectionIds, endNode.id],
    };

    dispatch(addNode(endNode));
    dispatch(addWire(updatedWire));
    dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));
    dispatch(startWire({ x1: transformedX, y1: transformedY, startNodeId: endNode.id }));
  };
