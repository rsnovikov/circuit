import { FC } from 'react';
import { cirElementList } from '@/entities/breadboard/model/cirElementList';
import { usePickElement } from '@/features/pickElement';
import { useAppSelector } from '@/shared/model';
import { PickerCirElement } from './PickerCirElement';

export const PickerCirElementList: FC = () => {
  const pickedElement = useAppSelector((state) => state.breadboard.pickedElement);

  const { addPickedElement } = usePickElement();

  return (
    <div className="flex justify-between items-stretch flex-wrap p-3 after:content-[''] after:flex-auto -mr-[10.5px]">
      {Object.values(cirElementList).map((cirElem) => (
        <div key={cirElem.type} className="mb-5 mr-[7.5px] select-none">
          <PickerCirElement
            onMouseDown={({ clientX, clientY }) =>
              addPickedElement({ clientX, clientY, elementType: cirElem.type })
            }
            cirElem={cirElem}
            pickedElement={pickedElement}
          />
        </div>
      ))}
    </div>
  );
};
