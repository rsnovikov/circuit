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

  const draggableElement = useAppSelector((state) => state.breadboard.draggableElement);

  const handleKeyDown = () => {
    dispatch(cancelDraggableElement());
  };

  useKeyDown({ callback: handleKeyDown, codes: ['Escape'] });

  const handleMouseDown = (e: MouseEvent, id: string) => {
    const { clientX, clientY } = e;

    dispatch(
      addDraggableElement({
        elementId: id,
        clientX,
        clientY,
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
