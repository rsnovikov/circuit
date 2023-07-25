import { FC } from 'react';
import { RemoveElementTool } from '@/features/elementTools/ui/RemoveElementTool';

export const ElementToolsList: FC = () => {
  return (
    <div className="flex h-full p-2">
      <div className="flex mr-1.5">
        <RemoveElementTool />
      </div>
      {/* <div className="flex mr-1.5">
        <RotateElementTool direction="left" />
      </div>
      <div className="flex mr-1.5">
        <RotateElementTool direction="right" />
      </div> */}
    </div>
  );
};
