import { MouseEvent } from 'react';
import {
  addDraggableElement,
  removeDraggableElement,
} from '@/entities/breadboard';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const useDragElement = () => {
  // todo: maybe don't use selector there for sc
  const elements = useAppSelector((state) => state.breadboard.elements);
  const dispatch = useAppDispatch();
  const draggableElement = useAppSelector(
    (state) => state.breadboard.draggableElement
  );

  const handleMouseDown = (e: MouseEvent, id: string) => {
    const { clientX, clientY } = e;
    const element = elements.find((element) => element.id === id);
    if (!element) return;
    const { x, y } = element;
    const offsetX = clientX - x;
    const offsetY = clientY - y;

    dispatch(
      addDraggableElement({
        elementId: id,
        initialX: clientX,
        initialY: clientY,
        offsetX,
        offsetY,
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
