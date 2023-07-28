import { FC } from 'react';
import {
  SaveAsJsonBreadboardTool,
  SaveAsSVgBreadboardTool,
  StartModelingBreadboardTool,
  UploadJsonBreadboardTool,
} from '@/features/breadboardTools';

export const BreadboardToolsList: FC = () => {
  return (
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
      <div className="flex mr-1.5">
        <UploadJsonBreadboardTool />
      </div>
    </div>
  );
};
