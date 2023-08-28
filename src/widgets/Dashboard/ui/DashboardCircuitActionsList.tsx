import { FC } from 'react';
import { CircuitListItem } from '@/entities/circuit/api/types';
import { RemoveCircuit } from '../../../features/dashboard/removeCircuit/ui/RemoveCircuit';
import { RenameCircuit } from '../../../features/dashboard/renameCircuit/ui/RenameCircuit';

interface ICircuitActionsListProps {
  circuit: CircuitListItem;
}

export const DashboardCircuitActionsList: FC<ICircuitActionsListProps> = ({ circuit }) => {
  return (
    <div className="absolute bg-white right-0 bottom-0 shadow rounded text-lg py-1 font-medium">
      <RenameCircuit circuit={circuit} />
      <RemoveCircuit circuit={circuit} />
    </div>
  );
};
