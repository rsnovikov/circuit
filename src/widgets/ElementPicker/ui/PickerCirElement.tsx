import { FC } from 'react';
import { ICirElement } from '@/shared/ui/types';

interface IPickerCirElementProps {
  cirElem: ICirElement;
}

export const PickerCirElement: FC<IPickerCirElementProps> = ({ cirElem }) => {
  return (
    <div className="w-[85px] h-full cursor-pointer bg-[#f1f1f3] rounded-md text-[#34495e] text-[12px]">
      <img src={cirElem.previewImgPath} className="pointer-events-none" />
      <div className="text-center h-[41px] text-ellipsis overflow-hidden p-[5px] pt-0">
        {cirElem.name}
      </div>
    </div>
  );
};
