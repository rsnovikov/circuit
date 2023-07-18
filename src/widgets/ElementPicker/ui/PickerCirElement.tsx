import { FC } from 'react';
import clsx from 'clsx';
import { useAppSelector } from '@/shared/model';
import { ICirElement } from '@/shared/model/types';

interface IPickerCirElementProps {
  cirElem: ICirElement;
}

export const PickerCirElement: FC<IPickerCirElementProps> = ({ cirElem }) => {
  const pickedElement = useAppSelector(
    (state) => state.breadboard.pickedElement
  );

  return (
    <div
      className={clsx(
        'w-[88px] h-full cursor-pointer bg-[#f1f1f3] rounded-md text-[#34495e] text-[12px] hover:border-blue-400 border-2 border-transparent hover:border-opacity-70 hover:bg-white hover:text-blue-400',
        pickedElement?.type === cirElem.type &&
          'border-blue-600 border-opacity-70'
      )}
    >
      <img src={cirElem.previewImgPath} className="pointer-events-none" />
      <div className="text-center h-[41px] text-ellipsis overflow-hidden p-[5px] pt-0">
        {cirElem.name}
      </div>
    </div>
  );
};
