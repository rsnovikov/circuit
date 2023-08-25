import { FC } from 'react';
import { cirElementList } from '@/entities/breadboard/model/cirElementList';
import { BreadboardCirElement } from '@/entities/breadboard/ui/BreadboardCirElement';
import { useDragElement } from '@/features/breadboard/dragElement';
import { ElementTerminals } from '@/features/breadboard/elementTerminals/ElementTerminals';
import { useSelectBreadboardElement } from '@/features/breadboard/selectBreadboardElement/useSelectBreadboardElement';
import { useAppSelector } from '@/shared/model';

export const BreadboardElements: FC = () => {
  const elements = useAppSelector((state) => state.breadboard.elements);
  const selectedElementId = useAppSelector((state) => state.breadboard.selectedElementId);
  const { startDragElement, endDragElement } = useDragElement();
  const { selectElement } = useSelectBreadboardElement();

  return elements.map((element) => (
    <BreadboardCirElement
      key={element.id}
      element={element}
      selectedElementId={selectedElementId}
      onMouseDown={({ clientX, clientY }) => {
        startDragElement({ clientX, clientY, elementId: element.id });
        selectElement({ elementId: element.id });
      }}
      onMouseUp={() => endDragElement({ elementId: element.id })}
    >
      <ElementTerminals terminals={cirElementList[element.type].terminals} elementId={element.id} />
    </BreadboardCirElement>
  ));
};
