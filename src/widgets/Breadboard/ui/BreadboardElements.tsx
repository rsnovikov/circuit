import { FC } from 'react';
import { BreadboardCirElement } from '@/entities/breadboard/ui/BreadboardCirElement';
import { useDragElement } from '@/features/dragElement';
import { ElementTerminals } from '@/features/elementTerminals/ElementTerminals';
import { useSelectBreadboardElement } from '@/features/selectBreadboardElement/useSelectBreadboardElement';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
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
