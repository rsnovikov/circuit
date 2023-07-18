import { MouseEvent } from 'react';
import {
  addDraggableElement,
  removeDraggableElement,
} from '@/entities/breadboard';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const useDragElement = () => {
  const dispatch = useAppDispatch();
  const draggableElement = useAppSelector(
    (state) => state.breadboard.draggableElement
  );

  const handleMouseDown = (e: MouseEvent, id: string) => {
    const { clientX, clientY } = e;
    dispatch(
      addDraggableElement({
        elementId: id,
        initialX: clientX,
        initialY: clientY,
      })
    );
  };

  const handleMouseUp = (e: MouseEvent, id: string) => {
    if (id === draggableElement?.elementId) {
      dispatch(removeDraggableElement());
    }
  };

  return { handleMouseDown, handleMouseUp };
};
