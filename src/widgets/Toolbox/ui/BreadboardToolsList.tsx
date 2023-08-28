import { FC } from 'react';
import { SaveAsJsonBreadboardTool } from '@/features/circuitTools/SaveAsJsonBreadboardTool';
import { SaveAsSVgBreadboardTool } from '@/features/circuitTools/SaveAsSvgBreadboardTool';
import { StartModelingBreadboardTool } from '@/features/circuitTools/StartModelingBreadboardTool';
import { ToggleGridBreadboardTool } from '@/features/circuitTools/ToggleGridBreadboardTool';
import { UploadJsonBreadboardTool } from '@/features/circuitTools/UploadJsonBreadboardTool';

export const BreadboardToolsList: FC = () => {
  return (
    <div className="flex h-full">
      <div className="flex mx-2 p-2 h-full border-x border-gray-600">
        <div className="flex">
          <ToggleGridBreadboardTool />
        </div>
      </div>

      <div className="flex h-full p-2">
        <div className="flex mr-3">
          <StartModelingBreadboardTool />
        </div>
        <div className="flex mr-1.5">
          <SaveAsSVgBreadboardTool />
        </div>
        <div className="flex mr-1.5">
          <SaveAsJsonBreadboardTool />
        </div>
        <div className="flex">
          <UploadJsonBreadboardTool />
        </div>
      </div>
    </div>
  );
};
