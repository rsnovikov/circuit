import { FC } from 'react';
import { Breadboard } from '@/widgets/Breadboard';
import { ElementPicker } from '@/widgets/ElementPicker/ui/ElementPicker';

export const CircuitPage: FC = () => (
  <div className="w-full h-full overflow-hidden">
    <Breadboard />
    <ElementPicker />
  </div>
);
