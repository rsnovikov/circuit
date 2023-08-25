import { FC } from 'react';
import { CircuitListItem } from '@/entities/breadboard/api/types';
import { RemoveCircuit } from './removeCircuit/RemoveCircuit';
import { RenameCircuit } from './renameCircuit/RenameCircuit';

interface ICircuitActionsListProps {
  circuit: CircuitListItem;
}

export const CircuitActionsList: FC<ICircuitActionsListProps> = ({ circuit }) => {
  return (
    <div className="absolute bg-white right-0 bottom-0 shadow rounded text-lg py-1 font-medium">
      <RenameCircuit circuit={circuit} />
      <RemoveCircuit circuit={circuit} />
    </div>
  );
};
