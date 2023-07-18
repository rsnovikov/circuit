import { FC, MouseEventHandler } from 'react';
import { updatePickedElementCoords } from '@/entities/breadboard';
import {
  confirmPickedElement,
  updateDraggableElement,
} from '@/entities/breadboard/model/slice';
import { BreadboardCirElement } from '@/entities/breadboard/ui/BreadboardCirElement';
import { useDragElement } from '@/features/dragElement';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const Breadboard: FC = () => {
  const dispatch = useAppDispatch();
  const { pickedElement, elements, draggableElement } = useAppSelector(
    (state) => state.breadboard
  );

  const handleMouseMove: MouseEventHandler<SVGElement> = (e) => {
    const { clientX: x, clientY: y } = e;
    // todo: move updatePickedElement to features
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

  const handleSVGClick: MouseEventHandler<SVGElement> = () => {
    if (pickedElement) {
      dispatch(confirmPickedElement());
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
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
