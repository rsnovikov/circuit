import { FC } from 'react';
import { BreadboardToolsList } from './BreadboardToolsList';
import { ElementToolsList } from './ElementToolsList';

export const Toolbox: FC = () => {
  return (
    <div className="border-b border-b-gray-300 bg-[#f4f5f6] p-1">
      <div className="flex h-full justify-between">
        <ElementToolsList />
        <BreadboardToolsList />
      </div>
    </div>
  );
};
