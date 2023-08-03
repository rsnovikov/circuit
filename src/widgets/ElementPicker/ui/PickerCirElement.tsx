import { FC } from 'react';
import clsx from 'clsx';
import { usePickElement } from '@/features/pickElement';
import { useAppSelector } from '@/shared/model';
import { IPickerElement } from '../model/types';

interface IPickerCirElementProps {
  cirElem: IPickerElement;
}

export const PickerCirElement: FC<IPickerCirElementProps> = ({ cirElem }) => {
  const pickedElement = useAppSelector((state) => state.breadboard.pickedElement);

  const { handleMouseDown } = usePickElement({ elementType: cirElem.type });

  return (
    <div
      onMouseDown={handleMouseDown}
      className={clsx(
        'w-[88px] h-full cursor-pointer bg-[#f1f1f3] rounded-md text-[#34495e] text-[12px] hover:border-blue-400 border-2 border-transparent hover:border-opacity-70 hover:bg-white hover:text-blue-400'

        // todo: don't work
        // pickedElement?.type === cirElem.type &&
        //   'border-blue-600 border-opacity-70'
      )}
      // todo: try use tailwind instead of style
      style={{
        borderColor: pickedElement?.type === cirElem.type ? 'rgb(37 99 235 / 0.7)' : '',
      }}
    >
      <img src={cirElem.previewImgPath} className="pointer-events-none" />
      <div className="text-center h-[41px] text-ellipsis overflow-hidden p-[5px] pt-0">
        {cirElem.name}
      </div>
    </div>
  );
};
