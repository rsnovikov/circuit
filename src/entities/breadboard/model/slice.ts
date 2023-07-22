import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { ICoords, ITranslateCoords } from '@/shared/model/types';
import { transformCoords } from '../lib/trasformCoords';
import { IBreadboardCirElement, ICirNode, ICirWire, IDraggableElement } from './types';

interface IBreadboardSliceState {
  scale: number;
  pickedElement: IBreadboardCirElement | null;
  draggableElement: IDraggableElement | null;
  elements: IBreadboardCirElement[];
  nodes: ICirNode[];
  selectedElementId: string | null;
  translateCoords: ITranslateCoords;
  drawingWire: ICirWire | null;
  wires: ICirWire[];
}

const initialState: IBreadboardSliceState = {
  scale: 1,
  pickedElement: null,
  draggableElement: null,
  elements: [],
  nodes: [],
  selectedElementId: null,
  translateCoords: {
    translateX: 0,
    translateY: 0,
  },
  drawingWire: null,
  wires: [],
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
    setDrawingWire(state, action: PayloadAction<ICirWire | null>) {
      state.drawingWire = action.payload;
    },
    addWire(state, action: PayloadAction<ICirWire>) {
      state.wires.push(action.payload);
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
  addNode,
  setDrawingWire,
  updateNodeById,
  addWire,
  updateWireById,
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
    const { draggableElement, elements, scale, nodes, wires } = getState().breadboard;

    if (!draggableElement) return;
    const cirElement = elements.find((element) => element.id === draggableElement.elementId);
    if (!cirElement) return;
    const { offsetX, offsetY } = draggableElement;
    const { x: transformedX, y: transformedY } = transformCoords({ x, y, scale });

    // todo: optimize iterables, maybe add field relatedElement to wire
    const elementNodes = nodes.filter((node) => node.relatedElement?.elementId === cirElement.id);
    // todo: refactor this trash!
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
            x2: transformedX - offsetX + endNode.x,
            y2: transformedY - offsetY + endNode.y,
          };
          dispatch(updateWireById({ id: updatedWire.id, updatedWire }));
        } else {
          const startNode = elementNodes.find((node) => node.id === wire.startNodeId);
          if (!startNode) return;

          const updatedWire: ICirWire = {
            ...wire,
            x1: transformedX - offsetX + startNode.x,
            y1: transformedY - offsetY + startNode.y,
          };
          dispatch(updateWireById({ id: updatedWire.id, updatedWire }));
        }
      });

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
    const { nodes, elements } = getState().breadboard;
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
    const { nodes, elements, drawingWire } = getState().breadboard;
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
    const { drawingWire, scale, translateCoords } = getState().breadboard;
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
    const { scale, translateCoords, drawingWire, nodes } = getState().breadboard;
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
