import { FC } from 'react';
import { BreadboardCirElement } from '@/entities/breadboard/ui/BreadboardCirElement';
import { useDragElement } from '@/features/dragElement';
import { useAppSelector } from '@/shared/model';

export const BreadboardElements: FC = () => {
  const elements = useAppSelector((state) => state.breadboard.elements);

  const { handleMouseDown: handleElementMouseDown, handleMouseUp: handleElementMouseUp } =
    useDragElement();

  return elements.map((element) => (
    <BreadboardCirElement
      key={element.id}
      element={element}
      onMouseDown={(e) => handleElementMouseDown(e, element.id)}
      onMouseUp={(e) => handleElementMouseUp(e, element.id)}
    />
  ));
};
