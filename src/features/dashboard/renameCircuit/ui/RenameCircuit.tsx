import { FC } from 'react';
import { CircuitListItem } from '@/entities/circuit/api/types';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { RenameBreadboardForm } from './RenameCircuitForm';

interface IRenameCircuitProps {
  circuit: CircuitListItem;
}

export const RenameCircuit: FC<IRenameCircuitProps> = ({ circuit }) => {
  const { openModal, closeModal } = useModal();
  const handleClick = () => {
    openModal(<RenameBreadboardForm circuit={circuit} closeModal={closeModal} />);
  };

  return (
    <div className="p-2 hover:bg-gray-200" onClick={handleClick}>
      Переименовать
    </div>
  );
};
