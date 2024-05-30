import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICirElement } from '@/entities/cirElement/model/types';
import { circuitApi } from '@/entities/circuit';
import { CircuitData } from '@/entities/circuit/api/types';
import { IDraggableElement } from '@/shared/model/types';
import { RootState } from "@/app/appStore";

interface ICirElementSliceState {
  pickedElement: ICirElement | null;
  draggableElement: IDraggableElement | null;
  selectedElementId: string | null;
  elements: ICirElement[];
}

const initialState: ICirElementSliceState = {
  pickedElement: null,
  draggableElement: null,
  elements: [],
  selectedElementId: null,
};

export const CirElementSlice = createSlice({
  name: 'cirElement',
  initialState,
  reducers: {
    setCirElements: (state, action: PayloadAction<ICirElement[]>) => {
      state.elements = action.payload;
    },

    setPickedElement(state, action: PayloadAction<ICirElement | null>) {
      state.pickedElement = action.payload;
    },
    addElement(state, action: PayloadAction<ICirElement>) {
      state.elements.push(action.payload);
    },

    updateElementById(
      state,
      action: PayloadAction<{
        id: string;
        updatedElement: Partial<ICirElement>;
      }>
    ) {
      const { id, updatedElement } = action.payload;
      const index = state.elements.findIndex((element) => element.id === id);
      if (index !== -1) {
        state.elements[index] = {...state.elements[index], ...updatedElement };
      }
    },
    removeElementById(state, action: PayloadAction<string>) {
      state.elements = state.elements.filter((element) => element.id !== action.payload);
    },
    setDraggableElement(state, action: PayloadAction<IDraggableElement | null>) {
      state.draggableElement = action.payload;
    },
    setSelectedElementId(state, action: PayloadAction<string | null>) {
      state.selectedElementId = action.payload;
    },

    resetCircuitData: () => initialState,
  },
  extraReducers(builder) {
    builder.addMatcher(
      circuitApi.endpoints.getCircuitData.matchFulfilled,
      (state, { payload }: PayloadAction<CircuitData>) => {
        const { elements } = payload;
        state.elements = elements;
      }
    );
  },
});

export const {
  setCirElements,
  setPickedElement,
  addElement,
  setDraggableElement,
  updateElementById,
  setSelectedElementId,
  removeElementById,
  resetCircuitData,
} = CirElementSlice.actions;

export const selectCirElementById = (id: string) => (state: RootState) => state.cirElement.elements.find(item => item.id === id)