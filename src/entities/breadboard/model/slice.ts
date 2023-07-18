import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { ICoords } from '@/shared/model/types';
import { IBreadboardCirElement, IDraggableElement } from './types';

interface IBreadboardSliceState {
  pickedElement: IBreadboardCirElement | null;
  draggableElement: IDraggableElement | null;
  elements: IBreadboardCirElement[];
  selectedElementId: string | null;
}

const initialState: IBreadboardSliceState = {
  pickedElement: null,
  draggableElement: null,
  elements: [],
  selectedElementId: null,
};

export const breadboardSlice = createSlice({
  name: 'breadboard',
  initialState,
  reducers: {
    setPickedElement(
      state,
      action: PayloadAction<IBreadboardCirElement | null>
    ) {
      state.pickedElement = action.payload;
    },
    addElement(state, action: PayloadAction<IBreadboardCirElement>) {
      state.elements.push(action.payload);
    },

    updateElementById(
      state,
      action: PayloadAction<{
        id: string;
        updatedElement: IBreadboardCirElement;
      }>
    ) {
      const { id, updatedElement } = action.payload;
      const index = state.elements.findIndex((element) => element.id === id);
      if (index !== -1) {
        state.elements[index] = updatedElement;
      }
    },
    removeElementById(state, action: PayloadAction<string>) {
      state.elements = state.elements.filter(
        (element) => element.id !== action.payload
      );
    },
    setDraggableElement(
      state,
      action: PayloadAction<IDraggableElement | null>
    ) {
      state.draggableElement = action.payload;
    },
    setSelectedElementId(state, action: PayloadAction<string | null>) {
      state.selectedElementId = action.payload;
    },
  },
});

const {
  setPickedElement,
  addElement,
  setDraggableElement,
  updateElementById,
  setSelectedElementId,
  removeElementById,
} = breadboardSlice.actions;

// todo: move actions to another file
export const addPickedElement =
  ({ elementType, x, y }: { elementType: string; x: number; y: number }) =>
  (dispatch: AppDispatch) => {
    const cirElement = cirElementList.find((item) => item.type === elementType);
    if (!cirElement) return;
    const breadboardCirElement: IBreadboardCirElement = {
      ...cirElement,
      id: nanoid(),
      x,
      y,
      rotate: 0,
    };
    dispatch(setPickedElement(breadboardCirElement));
    dispatch(setSelectedElementId(breadboardCirElement.id));
  };

export const removePickedElement = () => (dispatch: AppDispatch) => {
  dispatch(setPickedElement(null));
};

// todo: maybe move main logic to feature
export const updatePickedElementCoords =
  (coords: ICoords) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { pickedElement } = getState().breadboard;
    if (!pickedElement) return;
    const updatedPickedElement: IBreadboardCirElement = {
      ...pickedElement,
      ...coords,
    };
    dispatch(setPickedElement(updatedPickedElement));
  };

export const confirmPickedElement =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { pickedElement } = getState().breadboard;
    if (!pickedElement) return;
    dispatch(setPickedElement(null));
    dispatch(addElement(pickedElement));
  };

export const addDraggableElement =
  (draggableElement: IDraggableElement) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const cirElement = getState().breadboard.elements.find(
      (element) => element.id === draggableElement.elementId
    );
    if (!cirElement) return;
    dispatch(setDraggableElement(draggableElement));
    dispatch(setSelectedElementId(draggableElement.elementId));
  };

// todo: join confirmDraggableElement and updateDraggableElement

export const confirmDraggableElement = () => (dispatch: AppDispatch) => {
  dispatch(setDraggableElement(null));
};

// todo: maybe don't update elements every time, but update draggableElement and render in widget Breadboard
export const updateDraggableElement =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { draggableElement, elements } = getState().breadboard;

    if (!draggableElement) return;
    const cirElement = elements.find(
      (element) => element.id === draggableElement.elementId
    );
    if (!cirElement) return;
    const { offsetX, offsetY } = draggableElement;
    const updatedCirElement = { ...cirElement, x: x - offsetX, y: y - offsetY };

    dispatch(
      updateElementById({
        id: updatedCirElement.id,
        updatedElement: updatedCirElement,
      })
    );
  };

export const cancelDraggableElement =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { draggableElement } = getState().breadboard;
    if (!draggableElement) return;
    const { initialX: x, initialY: y } = draggableElement;
    dispatch(updateDraggableElement({ x, y }));
    dispatch(setDraggableElement(null));
  };

export const removeSelectedElementId = () => (dispatch: AppDispatch) => {
  dispatch(setSelectedElementId(null));
};

export const removeSelectedElement =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { selectedElementId, elements } = getState().breadboard;
    if (!selectedElementId) return;
    dispatch(removeElementById(selectedElementId));
  };

export const rotateSelectedElement =
  (angle: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { elements, selectedElementId } = getState().breadboard;
    if (!selectedElementId) return;
    const element = elements.find(
      (element) => element.id === selectedElementId
    );
    if (!element) return;
    const updatedElement: IBreadboardCirElement = {
      ...element,
      rotate: element.rotate + angle,
    };
    dispatch(updateElementById({ id: element.id, updatedElement }));
  };
