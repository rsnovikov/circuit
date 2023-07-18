import { FC } from 'react';
import { ToolsList } from './ToolsList';

export const Toolbox: FC = () => {
  return (
    <div className="absolute inset-0 border-b border-b-gray-300 bg-[#f4f5f6]">
      <div className="flex h-full justify-between">
        <ToolsList />
      </div>
    </div>
  );
};
