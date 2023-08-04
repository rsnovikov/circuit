import { FC } from 'react';
import { usePickElement } from '@/features/pickElement';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { useAppSelector } from '@/shared/model';
import { PickerCirElement } from './PickerCirElement';

export const PickerCirElementList: FC = () => {
  const pickedElement = useAppSelector((state) => state.breadboard.pickedElement);

  const { pickElement } = usePickElement();

  return (
    <div className="flex justify-between items-stretch flex-wrap p-3 after:content-[''] after:flex-auto -mr-[10.5px]">
      {Object.values(cirElementList).map((cirElem) => (
        <div key={cirElem.type} className="mb-5 mr-[7.5px] select-none">
          <PickerCirElement
            onMouseDown={({ clientX, clientY }) =>
              pickElement({ clientX, clientY, elementType: cirElem.type })
            }
            cirElem={cirElem}
            pickedElement={pickedElement}
          />
        </div>
      ))}
    </div>
  );
};
