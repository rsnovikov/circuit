import { MouseEvent } from 'react';
import {
  addDraggableElement,
  cancelDraggableElement,
  confirmDraggableElement,
} from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const useDragElement = () => {
  // todo: maybe don't use selector there
  const dispatch = useAppDispatch();

  const elements = useAppSelector((state) => state.breadboard.elements);

  const draggableElement = useAppSelector(
    (state) => state.breadboard.draggableElement
  );

  const handleKeyDown = () => {
    dispatch(cancelDraggableElement());
  };

  useKeyDown(handleKeyDown, ['Escape']);

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

  const handleMouseUp = (_: MouseEvent, id: string) => {
    if (id === draggableElement?.elementId) {
      dispatch(confirmDraggableElement());
    }
  };

  return { handleMouseDown, handleMouseUp };
};
