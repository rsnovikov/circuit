import { FC } from 'react';
import { StartModelingBreadboardTool } from '@/features/breadboardTools';
import { SaveAsSVgBreadboardTool } from '@/features/breadboardTools/ui/SaveAsSvgBreadboardTool';

export const BreadboardToolsList: FC = () => {
  return (
    <div className="flex h-full p-2">
      <div className="flex mr-3">
        <StartModelingBreadboardTool />
      </div>

      <div className="flex mr-1.5">
        <SaveAsSVgBreadboardTool />
      </div>
    </div>
  );
};
