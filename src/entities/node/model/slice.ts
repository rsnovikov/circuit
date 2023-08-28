import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { circuitApi } from '@/entities/circuit/api/api';
import { CircuitData } from '@/entities/circuit/api/types';
import { IDraggableElement } from '@/shared/model/types';
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
    setNodes(state, action: PayloadAction<ICirNode[]>) {
      state.nodes = action.payload;
    },
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
    resetNodeData: () => initialState,
  },
  extraReducers(builder) {
    builder.addMatcher(
      circuitApi.endpoints.getCircuitData.matchFulfilled,
      (state, { payload }: PayloadAction<CircuitData>) => {
        state.nodes = payload.nodes;
      }
    );
  },
});

export const {
  setNodes,
  addNode,
  updateNodeById,
  removeNodeById,
  setDraggableNode,
  setSelectedNodeId,
  resetNodeData,
} = nodeSlice.actions;
