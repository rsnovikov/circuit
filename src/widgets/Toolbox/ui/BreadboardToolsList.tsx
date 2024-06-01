import { FC } from 'react';
import { SaveAsJsonBreadboardTool } from '@/features/circuitTools/ui/SaveAsJsonBreadboardTool';
import { SaveAsSVgBreadboardTool } from '@/features/circuitTools/ui/SaveAsSvgBreadboardTool';
import { StartModelingBreadboardTool } from '@/features/circuitTools/ui/StartModelingBreadboardTool';
import { ToggleGridBreadboardTool } from '@/features/circuitTools/ui/ToggleGridBreadboardTool';
import { UploadJsonBreadboardTool } from '@/features/circuitTools/ui/UploadJsonBreadboardTool';

export const BreadboardToolsList: FC = () => {
  return (
    <div className="flex h-full">
      <div className=" mx-2 p-2 flex border-x border-gray-600 h-auto items-center">
          <ToggleGridBreadboardTool />
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
