import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { initialCirElementList } from '@/entities/cirElement/model/InitialCirElementList';
import { addElement, setPickedElement } from '@/entities/cirElement/model/slice';
import { ICirElement } from '@/entities/cirElement/model/types';
import { ICirNode, addNode } from '@/entities/node';
import { roundTo } from '@/shared/lib/roundTo';

export const confirmPickedElementAction =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      cirElement: { pickedElement },
      circuit: { gridStep },
    } = getState();
    if (!pickedElement) return;

    const updatedPickedElement: ICirElement = {
      ...pickedElement,
      x: roundTo(pickedElement.x, gridStep),
      y: roundTo(pickedElement.y, gridStep),
    };

    const pickedElementNodes = initialCirElementList[updatedPickedElement.type].terminals
      .map((terminal) => {
        const nodeElement: ICirNode = {
          id: nanoid(),
          relatedElement: {
            elementId: updatedPickedElement.id,
            terminalId: terminal.id,
          },
          connectionIds: terminal.relatedTerminalId ? [terminal.relatedTerminalId] : [],
          x: terminal.x,
          y: terminal.y,
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

    dispatch(addElement(updatedPickedElement));

    dispatch(setPickedElement(null));
  };
