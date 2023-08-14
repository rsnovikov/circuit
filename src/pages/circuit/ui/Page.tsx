import { FC } from 'react';
import { Breadboard } from '@/widgets/Breadboard';
import { ElementPicker } from '@/widgets/ElementPicker/ui/ElementPicker';
import { SelectedElementModal } from '@/widgets/SelectedElementModal';
import { Toolbox } from '@/widgets/Toolbox';

export const CircuitPage: FC = () => (
  <div className="w-full h-full overflow-hidden relative text-[#34495e]">
    <div className="h-[50px]">
      <Toolbox />
    </div>
    <div className="relative flex h-full w-full justify-end items-start">
      <Breadboard />
      <SelectedElementModal />
      <ElementPicker />
    </div>
  </div>
);
