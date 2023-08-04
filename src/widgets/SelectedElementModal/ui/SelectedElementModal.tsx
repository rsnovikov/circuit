import { FC } from 'react';
import { SelectedElementModalForm } from '@/features/selectedElementModalForm/ui/SelectedElementModalForm';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { useAppSelector } from '@/shared/model';
import { SelectedElementFieldList } from './SelectedElementFieldList';

export const SelectedElementModal: FC = () => {
  const selectedElement = useAppSelector((state) =>
    state.breadboard.elements.find((element) => element.id === state.breadboard.selectedElementId)
  );

  if (!selectedElement) return null;

  const { name } = cirElementList[selectedElement.type];

  return (
    <div className="absolute right-[310px] top-[10px] w-[260px] border-2 border-blue-400 rounded bg-white">
      <div className="py-3 bg-blue-400 px-2 text-xl text-white">{name}</div>
      <div className="p-2">
        <SelectedElementFieldList
          physData={selectedElement.physData}
          selectedElementType={selectedElement.type}
        />
        <SelectedElementModalForm selectedElement={selectedElement} />
      </div>
    </div>
  );
};
