import { FC } from 'react';
import { initialCirElementList } from '@/entities/cirElement/model/InitialCirElementList';
import { usePickElement } from '@/features/breadboard/pickElement';
import { useAppSelector } from '@/shared/model';
import { PickerCirElement } from './PickerCirElement';

export const PickerCirElementList: FC = () => {
  const pickedElement = useAppSelector((state) => state.cirElement.pickedElement);

  const { addPickedElement } = usePickElement();

  return (
    <div className="flex justify-between items-stretch flex-wrap p-3 after:content-[''] after:flex-auto gap-[10px]">
      {Object.values(initialCirElementList).map((cirElem) => (
        <div key={cirElem.type} className="select-none" style={{flex: '0 0 calc(33.3% - 10px)'}}>
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
