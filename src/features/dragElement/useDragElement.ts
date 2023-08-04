import {
  addDraggableElement,
  cancelDraggableElement,
  confirmDraggableElement,
} from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const useDragElement = () => {
  const dispatch = useAppDispatch();

  const draggableElement = useAppSelector((state) => state.breadboard.draggableElement);

  const handleKeyDown = () => {
    dispatch(cancelDraggableElement());
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
      addDraggableElement({
        elementId,
        clientX,
        clientY,
      })
    );
  };

  const endDragElement = ({ elementId }: { elementId: string }) => {
    if (elementId === draggableElement?.elementId) {
      dispatch(confirmDraggableElement());
    }
  };

  return { startDragElement, endDragElement };
};
