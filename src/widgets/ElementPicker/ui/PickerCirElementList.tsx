import { FC } from 'react';
import { PickElementWrapper } from '@/features/pickElement/ui/PickElementWrapper';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { PickerCirElement } from './PickerCirElement';

export const PickerCirElementList: FC = () => {
  return (
    <div className="flex justify-between items-stretch flex-wrap p-3 after:content-[''] after:flex-auto -mr-[10.5px]">
      {Object.values(cirElementList).map((cirElem) => (
        <div key={cirElem.type} className="mb-5 mr-[7.5px] select-none">
          <PickElementWrapper elementType={cirElem.type}>
            <PickerCirElement cirElem={cirElem} />
          </PickElementWrapper>
        </div>
      ))}
    </div>
  );
};
