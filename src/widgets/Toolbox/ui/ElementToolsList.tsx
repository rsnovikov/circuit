import { FC } from 'react';
import { RemoveSelectedTool } from '@/features/selectedTools/removeSelected/ui/RemoveSelectedTool';
import { RotateSelectedTool } from '@/features/selectedTools/rotateSelected/ui/RotateSelectedTool';

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
