import { FC } from 'react';
import { RemoveSelectedTool } from '@/features/selectedCirElementTools/removeSelected/ui/RemoveSelectedTool';
import { RotateSelectedTool } from '@/features/selectedCirElementTools/rotateSelected/ui/RotateSelectedTool';

export const ElementToolsList: FC = () => {
  return (
    <div className="flex h-full p-2">
      <div className=" mr-1.5">
        <RemoveSelectedTool />
      </div>
      <div className=" mr-1.5">
        <RotateSelectedTool direction="left" />
      </div>
      <div className=" mr-1.5">
        <RotateSelectedTool direction="right" />
      </div>
    </div>
  );
};
