import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { addDraggableElementAction } from './addDraggableElementAction';
import { cancelDraggableElementAction } from './cancelDraggableElementAction';
import { confirmDraggableElementAction } from './confirmDraggableElementAction';
import { updateDraggableElementAction } from './updateDraggableElementAction';

export const useDragElement = () => {
  const dispatch = useAppDispatch();

  const draggableElement = useAppSelector((state) => state.cirElement.draggableElement);

  const handleKeyDown = () => {
    dispatch(cancelDraggableElementAction());
  };

  useKeyDown({ callback: handleKeyDown, codes: ['Escape'] });

  const startDragElement = ({
    clientX,
    clientY,
    elementId,
  }: {
    clientX: number;
    clientY: number;
    elementId: string;
  }) => {
    dispatch(
      addDraggableElementAction({
        elementId,
        clientX,
        clientY,
      })
    );
  };

  const dragElement = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    dispatch(updateDraggableElementAction({ x: clientX, y: clientY }));
  };

  const endDragElement = ({ elementId }: { elementId: string }) => {
    if (elementId === draggableElement?.elementId) {
      dispatch(confirmDraggableElementAction());
    }
  };

  return { startDragElement, dragElement, endDragElement };
};
