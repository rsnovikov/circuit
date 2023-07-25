import { FC } from 'react';
import { BreadboardToolsList } from './BreadboardToolsList';
import { ElementToolsList } from './ElementToolsList';

export const Toolbox: FC = () => {
  return (
    <div className="absolute inset-0 border-b border-b-gray-300 bg-[#f4f5f6]">
      <div className="flex h-full justify-between">
        <ElementToolsList />
        <BreadboardToolsList />
      </div>
    </div>
  );
};
