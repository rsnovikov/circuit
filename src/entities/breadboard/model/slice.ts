import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { ICoords, ITranslateCoords } from '@/shared/model/types';
import { transformCoords } from '../lib/trasformCoords';
import { IBreadboardCirElement, IDraggableElement } from './types';

interface IBreadboardSliceState {
  scale: number;
  pickedElement: IBreadboardCirElement | null;
  draggableElement: IDraggableElement | null;
  elements: IBreadboardCirElement[];
  selectedElementId: string | null;
  translateCoords: ITranslateCoords;
}

const initialState: IBreadboardSliceState = {
  scale: 1,
  pickedElement: null,
  draggableElement: null,
  elements: [],
  selectedElementId: null,
  translateCoords: {
    translateX: 0,
    translateY: 0,
  },
};

export const breadboardSlice = createSlice({
  name: 'breadboard',
  initialState,
  reducers: {
    setPickedElement(state, action: PayloadAction<IBreadboardCirElement | null>) {
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
      state.elements = state.elements.filter((element) => element.id !== action.payload);
    },
    setDraggableElement(state, action: PayloadAction<IDraggableElement | null>) {
      state.draggableElement = action.payload;
    },
    setSelectedElementId(state, action: PayloadAction<string | null>) {
      state.selectedElementId = action.payload;
    },
    setScale(state, action: PayloadAction<number>) {
      state.scale = action.payload;
    },
    setTranslateCoords(state, action: PayloadAction<ITranslateCoords>) {
      state.translateCoords = action.payload;
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
  setScale,
  setTranslateCoords,
} = breadboardSlice.actions;

// todo: move actions to another file
export const addPickedElement =
  ({ elementType, x, y }: { elementType: string; x: number; y: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const cirElement = cirElementList.find((item) => item.type === elementType);
    if (!cirElement) return;
    const { scale, translateCoords } = getState().breadboard;
    const breadboardCirElement: IBreadboardCirElement = {
      ...cirElement,
      id: nanoid(),
      rotate: 0,
      ...transformCoords({ x, y, scale, translateCoords }),
    };
    dispatch(setPickedElement(breadboardCirElement));
    dispatch(setSelectedElementId(breadboardCirElement.id));
  };

export const removePickedElement = () => (dispatch: AppDispatch) => {
  dispatch(setPickedElement(null));
};

// todo: maybe move main logic to feature
export const updatePickedElementCoords =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { pickedElement, scale, translateCoords } = getState().breadboard;
    if (!pickedElement) return;
    const updatedPickedElement: IBreadboardCirElement = {
      ...pickedElement,
      ...transformCoords({ x, y, scale, translateCoords }),
    };
    dispatch(setPickedElement(updatedPickedElement));
  };

export const confirmPickedElement = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { pickedElement } = getState().breadboard;
  if (!pickedElement) return;
  dispatch(setPickedElement(null));
  dispatch(addElement(pickedElement));
};

export const addDraggableElement =
  ({ elementId, clientX, clientY }: { elementId: string; clientX: number; clientY: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { elements, scale } = getState().breadboard;

    const cirElement = elements.find((element) => element.id === elementId);
    if (!cirElement) return;
    const { x, y } = cirElement;
    const { x: transformedInitialX, y: transformedInitialY } = transformCoords({
      x: clientX,
      y: clientY,
      scale,
    });
    const offsetX = transformedInitialX - x;
    const offsetY = transformedInitialY - y;
    dispatch(
      setDraggableElement({
        elementId,
        initialX: x,
        initialY: y,
        offsetX,
        offsetY,
      })
    );
    dispatch(setSelectedElementId(elementId));
  };

// todo: join confirmDraggableElement and updateDraggableElement
export const confirmDraggableElement = () => (dispatch: AppDispatch) => {
  dispatch(setDraggableElement(null));
};

// todo: maybe don't update elements every time, but update draggableElement and render in widget Breadboard
export const updateDraggableElement =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { draggableElement, elements, scale } = getState().breadboard;

    if (!draggableElement) return;
    const cirElement = elements.find((element) => element.id === draggableElement.elementId);
    if (!cirElement) return;
    const { offsetX, offsetY } = draggableElement;
    const { x: transformedX, y: transformedY } = transformCoords({ x, y, scale });
    const updatedCirElement = {
      ...cirElement,
      x: transformedX - offsetX,
      y: transformedY - offsetY,
    };

    dispatch(
      updateElementById({
        id: updatedCirElement.id,
        updatedElement: updatedCirElement,
      })
    );
  };

export const cancelDraggableElement = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { draggableElement, elements } = getState().breadboard;
  if (!draggableElement) return;
  const { initialX, initialY } = draggableElement;
  const cirElement = elements.find((element) => element.id === draggableElement.elementId);
  if (!cirElement) return;
  dispatch(
    updateElementById({
      id: cirElement.id,
      updatedElement: { ...cirElement, x: initialX, y: initialY },
    })
  );
  dispatch(setDraggableElement(null));
};

export const removeSelectedElementId = () => (dispatch: AppDispatch) => {
  dispatch(setSelectedElementId(null));
};

export const removeSelectedElement = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedElementId } = getState().breadboard;
  if (!selectedElementId) return;
  dispatch(removeElementById(selectedElementId));
};

export const rotateSelectedElement =
  (angle: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { elements, selectedElementId } = getState().breadboard;
    if (!selectedElementId) return;
    const element = elements.find((element) => element.id === selectedElementId);
    if (!element) return;
    const updatedElement: IBreadboardCirElement = {
      ...element,
      rotate: element.rotate + angle,
    };
    dispatch(updateElementById({ id: element.id, updatedElement }));
  };

export const updateScale =
  (scaleStep: number, originPoint: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      scale,
      translateCoords: { translateX, translateY },
    } = getState().breadboard;
    const nextScale = scale + scaleStep;
    if (scale + scaleStep < 0.2 || scale + scaleStep > 5) return;

    const divis = nextScale / scale;

    const updatedTranslateX = divis * (translateX - originPoint.x) + originPoint.x;
    const updatedTranslateY = divis * (translateY - originPoint.y) + originPoint.y;

    dispatch(
      setTranslateCoords({
        translateX: updatedTranslateX,
        translateY: updatedTranslateY,
      })
    );
    dispatch(setScale(nextScale));
  };

export const updateTranslateCoords =
  ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      translateCoords: { translateX, translateY },
    } = getState().breadboard;
    dispatch(
      setTranslateCoords({ translateX: translateX + deltaX, translateY: translateY + deltaY })
    );
  };
