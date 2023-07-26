import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode, addNode, removeNodeById } from '@/entities/node';
import { removeWireById, updateWiresCoordsByCirElement } from '@/entities/wire';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { ElementTypesEnum } from '@/shared/model/ElementTypesEnum';
import { removeSelectedEntities } from '@/shared/model/actions';
import { ICoords, IDraggableElement, ITranslateCoords } from '@/shared/model/types';
import { transformCoords } from '../../../widgets/Breadboard/lib/transformCoords';
import { calculateSameTypeElements } from '../lib/calculateSameTypeElements';
import { IBreadboardCirElement } from './types';

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

export const addSelectedElementId = (id: string) => (dispatch: AppDispatch) => {
  dispatch(removeSelectedEntities());
  dispatch(setSelectedElementId(id));
};

// todo: move actions to another file
export const addPickedElement =
  ({ elementType, x, y }: { elementType: ElementTypesEnum; x: number; y: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const cirElement = cirElementList.find((item) => item.type === elementType);
    if (!cirElement) return;
    const { scale, translateCoords, elements } = getState().breadboard;
    const breadboardCirElement: IBreadboardCirElement = {
      ...cirElement,
      id: nanoid(),
      rotate: 0,
      ...transformCoords({ x, y, scale, translateCoords }),
      personalName: String(calculateSameTypeElements(elements, elementType)),
    };
    dispatch(setPickedElement(breadboardCirElement));
    dispatch(addSelectedElementId(breadboardCirElement.id));
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
  const pickedElementNodes = pickedElement.terminals
    .map((terminal) => {
      const nodeElement: ICirNode = {
        id: nanoid(),
        relatedElement: {
          elementId: pickedElement.id,
          terminalId: terminal.id,
        },
        connectionIds: terminal.relatedTerminalId ? [terminal.relatedTerminalId] : [],
        x: terminal.x,
        y: terminal.y,
        rotate: 0,
      };
      return nodeElement;
    })
    .map((nodeElement, _, array) => {
      const updatedConnectionIds = nodeElement.connectionIds.map((connectionId) => {
        const index = array.findIndex(({ relatedElement }) => {
          if (!relatedElement) return false;
          const { terminalId } = relatedElement;
          return terminalId === connectionId;
        });
        return array[index].id;
      });
      const updatedNodeElement = {
        ...nodeElement,
        connectionIds: updatedConnectionIds,
      };
      return updatedNodeElement;
    });

  pickedElementNodes.forEach((node) => dispatch(addNode(node)));

  dispatch(addElement(pickedElement));

  dispatch(setPickedElement(null));
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
    dispatch(addSelectedElementId(elementId));
  };

// todo: join confirmDraggableElement and updateDraggableElement
export const confirmDraggableElement = () => (dispatch: AppDispatch) => {
  dispatch(setDraggableElement(null));
};

// todo: maybe don't update elements every time, but update draggableElement and render in widget Breadboard
export const updateDraggableElement =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      breadboard: { draggableElement, elements, scale },
    } = getState();

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

    dispatch(updateWiresCoordsByCirElement(updatedCirElement));

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
  const updatedElement = { ...cirElement, x: initialX, y: initialY };
  dispatch(
    updateElementById({
      id: cirElement.id,
      updatedElement,
    })
  );
  dispatch(updateWiresCoordsByCirElement(updatedElement));
  dispatch(setDraggableElement(null));
};

export const removeSelectedElementId = () => (dispatch: AppDispatch) => {
  dispatch(setSelectedElementId(null));
};

export const removeSelectedElement = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const {
    breadboard: { selectedElementId, elements },
    node: { nodes },
    wire: { wires },
  } = getState();

  if (!selectedElementId) return;
  const selectedElement = elements.find((element) => element.id === selectedElementId);
  if (!selectedElement) return;

  const elementNodes = nodes.filter(
    (node) => node.relatedElement?.elementId === selectedElement.id
  );

  const elementWires = wires.filter((wire) =>
    elementNodes.some((node) => wire.endNodeId === node.id || wire.startNodeId === node.id)
  );

  elementNodes.forEach((node) => dispatch(removeNodeById(node.id)));
  elementWires.forEach((wire) => dispatch(removeWireById(wire.id)));
  dispatch(removeElementById(selectedElementId));
  dispatch(removeSelectedElementId());
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
      terminals: element.terminals.map((terminal) => ({
        ...terminal,
      })),
    };

    dispatch(updateWiresCoordsByCirElement(updatedElement));

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

    const scaleDivision = nextScale / scale;

    const updatedTranslateX = scaleDivision * (translateX - originPoint.x) + originPoint.x;
    const updatedTranslateY = scaleDivision * (translateY - originPoint.y) + originPoint.y;

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

export const updateSelectedElementField =
  ({ path, value }: { path: string; value: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { elements, selectedElementId } = getState().breadboard;
    const selectedElement = elements.find((element) => element.id === selectedElementId);
    if (!selectedElement) return;
    const updatedSelectedElement = cloneDeep(selectedElement);
    set(updatedSelectedElement, path, value);
    dispatch(
      updateElementById({ id: updatedSelectedElement.id, updatedElement: updatedSelectedElement })
    );
  };
