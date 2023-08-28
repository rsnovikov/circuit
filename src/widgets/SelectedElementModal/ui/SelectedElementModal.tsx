import { FC } from 'react';
import { initialCirElementList } from '@/entities/cirElement/model/InitialCirElementList';
import { SelectedElementModalForm } from '@/features/selectedElementModalForm/ui/SelectedElementModalForm';
import { useAppSelector } from '@/shared/model';
import { SelectedElementFieldList } from './SelectedElementFieldList';

export const SelectedElementModal: FC = () => {
  const selectedElement = useAppSelector((state) =>
    state.cirElement.elements.find((element) => element.id === state.cirElement.selectedElementId)
  );

  if (!selectedElement) return null;

  const { name } = initialCirElementList[selectedElement.type];

  return (
    <div className="relative w-[260px] border-2 border-blue-400 rounded mr-3 mt-2 bg-white">
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
