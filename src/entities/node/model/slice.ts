import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICirNode } from './types';

interface INodeSliceState {
  nodes: ICirNode[];
}

const initialState: INodeSliceState = {
  nodes: [],
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
  },
});

export const { addNode, updateNodeById } = nodeSlice.actions;
