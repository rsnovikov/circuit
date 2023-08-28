import { FC } from 'react';
import { initialCirElementList } from '@/entities/cirElement/model/InitialCirElementList';
import { BreadboardCirElement } from '@/entities/cirElement/ui/BreadboardCirElement';
import { useDragElement } from '@/features/breadboard/dragElement';
import { ElementTerminals } from '@/features/breadboard/elementTerminals/ui/ElementTerminals';
import { useSelectCirElement } from '@/features/breadboard/selectCirElement/model/useSelectCirElement';
import { useAppSelector } from '@/shared/model';

export const BreadboardElements: FC = () => {
  const elements = useAppSelector((state) => state.cirElement.elements);
  const selectedElementId = useAppSelector((state) => state.cirElement.selectedElementId);
  const { startDragElement, endDragElement } = useDragElement();
  const { selectElement } = useSelectCirElement();

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
      <ElementTerminals
        terminals={initialCirElementList[element.type].terminals}
        elementId={element.id}
      />
    </BreadboardCirElement>
  ));
};
