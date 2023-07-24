import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/app/appStore';
import { removeWireById, updateWiresCoordsByNode } from '@/entities/wire';
import { ICoords, IDraggableElement } from '@/shared/model/types';
import { transformCoords } from '@/widgets/Breadboard/lib/transformCoords';
import { ICirNode } from './types';

interface INodeSliceState {
  nodes: ICirNode[];
  selectedNodeId: string | null;
  draggableNode: IDraggableElement | null;
}

const initialState: INodeSliceState = {
  nodes: [],
  selectedNodeId: null,
  draggableNode: null,
};

export const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<ICirNode>) {
      state.nodes.push(action.payload);
    },
    updateNodeById(
      state,
      action: PayloadAction<{
        id: string;
        updatedNode: ICirNode;
      }>
    ) {
      const { id, updatedNode } = action.payload;
      const index = state.nodes.findIndex((element) => element.id === id);
      if (index !== -1) {
        state.nodes[index] = updatedNode;
      }
    },
    removeNodeById(state, action: PayloadAction<string>) {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
    setDraggableNode(state, action: PayloadAction<IDraggableElement | null>) {
      state.draggableNode = action.payload;
    },
    setSelectedNodeId(state, action: PayloadAction<string | null>) {
      state.selectedNodeId = action.payload;
    },
  },
});

export const { addNode, updateNodeById, removeNodeById, setDraggableNode, setSelectedNodeId } =
  nodeSlice.actions;

export const addDraggableNode =
  ({ nodeId, clientX, clientY }: { nodeId: string; clientX: number; clientY: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      breadboard: { scale },
      node: { nodes },
    } = getState();

    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return;
    const { x, y } = node;
    const { x: transformedInitialX, y: transformedInitialY } = transformCoords({
      x: clientX,
      y: clientY,
      scale,
    });
    const offsetX = transformedInitialX - x;
    const offsetY = transformedInitialY - y;
    dispatch(
      setDraggableNode({
        elementId: node.id,
        initialX: x,
        initialY: y,
        offsetX,
        offsetY,
      })
    );
    dispatch(setSelectedNodeId(node.id));
  };

export const confirmDraggableNode = () => (dispatch: AppDispatch) => {
  dispatch(setDraggableNode(null));
};

export const updateDraggableNode =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      breadboard: { scale },
      node: { nodes, draggableNode },
    } = getState();

    if (!draggableNode) return;
    const node = nodes.find((node) => node.id === draggableNode.elementId);
    if (!node) return;
    const { offsetX, offsetY } = draggableNode;
    const { x: transformedX, y: transformedY } = transformCoords({ x, y, scale });

    const updatedNode = {
      ...node,
      x: transformedX - offsetX,
      y: transformedY - offsetY,
    };

    dispatch(updateWiresCoordsByNode(updatedNode));

    dispatch(
      updateNodeById({
        id: updatedNode.id,
        updatedNode,
      })
    );
  };

export const removeSelectedNodeId = () => (dispatch: AppDispatch) => {
  dispatch(setSelectedNodeId(null));
};

export const removeSelectedNode = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const {
    node: { selectedNodeId, nodes },
    wire: { wires },
  } = getState();
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  if (!selectedNode) return;
  nodes.forEach((node) => {
    if (node.connectionIds.includes(selectedNode.id)) {
      const updatedConnectionIds = node.connectionIds.filter(
        (connectionId) => connectionId !== selectedNode.id
      );
      const updatedNode: ICirNode = { ...node, connectionIds: updatedConnectionIds };
      dispatch(updateNodeById({ id: updatedNode.id, updatedNode }));
    }
  });
  wires.forEach((wire) => {
    if (wire.startNodeId === selectedNode.id || wire.endNodeId === selectedNode.id) {
      dispatch(removeWireById(wire.id));
    }
  });
  dispatch(removeNodeById(selectedNode.id));
};
