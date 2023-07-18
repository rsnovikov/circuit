import { FC, MouseEventHandler } from 'react';
import { updatePickedElementCoords } from '@/entities/breadboard';
import {
  confirmPickedElement,
  removeSelectedElementId,
  updateDraggableElement,
} from '@/entities/breadboard/model/slice';
import { BreadboardCirElement } from '@/entities/breadboard/ui/BreadboardCirElement';
import { useDragElement } from '@/features/dragElement';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const Breadboard: FC = () => {
  const dispatch = useAppDispatch();
  const { pickedElement, elements, draggableElement, selectedElementId } =
    useAppSelector((state) => state.breadboard);

  // todo: try move listeners and dispatch to features
  const handleMouseMove: MouseEventHandler<SVGElement> = (e) => {
    const { clientX: x, clientY: y } = e;

    if (draggableElement) {
      dispatch(updateDraggableElement({ x, y }));
    } else if (pickedElement) {
      dispatch(updatePickedElementCoords({ x, y }));
    }
  };

  const {
    handleMouseDown: handleElementMouseDown,
    handleMouseUp: handleElementMouseUp,
  } = useDragElement();

  const handleSVGClick: MouseEventHandler<SVGElement> = (e) => {
    if (pickedElement) {
      dispatch(confirmPickedElement());
    }
    if (selectedElementId && e.target === e.currentTarget) {
      dispatch(removeSelectedElementId());
    }
  };

  // todo: maybe move logic to feature
  const handleKeyDownRemoveSelected = () => {
    dispatch(removeSelectedElementId());
  };
  useKeyDown(handleKeyDownRemoveSelected, ['Escape']);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className="absolute inset-0 bg-[#f4f5f6]"
      onMouseMove={handleMouseMove}
      onClick={handleSVGClick}
    >
      {elements.map((element) => (
        <BreadboardCirElement
          key={element.id}
          element={element}
          onMouseDown={(e) => handleElementMouseDown(e, element.id)}
          onMouseUp={(e) => handleElementMouseUp(e, element.id)}
        />
      ))}
      {/* todo: add special component without terminals for picked element */}
      {pickedElement && <BreadboardCirElement element={pickedElement} />}
    </svg>
  );
};
