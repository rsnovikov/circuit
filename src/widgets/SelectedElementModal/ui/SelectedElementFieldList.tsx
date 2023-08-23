import { FC } from 'react';
import { ElementTypesEnum } from '@/entities/breadboard/model/ElementTypesEnum';
import { cirElementList } from '@/entities/breadboard/model/cirElementList';
import { IBreadboardElementPhysData } from '@/entities/breadboard/model/types';

interface ISelectedElementFieldListProps {
  physData: IBreadboardElementPhysData;
  selectedElementType: ElementTypesEnum;
}

export const SelectedElementFieldList: FC<ISelectedElementFieldListProps> = ({
  physData,
  selectedElementType,
}) => {
  return (
    <ul>
      {Object.keys(physData).map((key) => {
        const { value } = physData[key];
        const { title, isChangeable } = cirElementList[selectedElementType].physData[key];
        if (isChangeable) return;

        return (
          <li
            key={title}
            className="h-[45px] flex justify-between mb-2 rounded border-2 border-blue-400 bg-gray-200/80"
          >
            <div className="h-full flex items-center justify-center bg-blue-400 text-white px-2">
              <span>{title}</span>
            </div>
            <div className="h-full w-full pl-2 text-blue-400 flex items-center justify-start">
              <span>{value}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
