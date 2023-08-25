import { FC } from 'react';
import { CircuitListItem } from '@/entities/breadboard/api/types';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { ConfirmRemoveCircuit } from './ConfirmRemoveCircuit';

interface IRemoveCircuitProps {
  circuit: CircuitListItem;
}

export const RemoveCircuit: FC<IRemoveCircuitProps> = ({ circuit }) => {
  const { openModal, closeModal } = useModal();

  const handleClick = () => {
    openModal(<ConfirmRemoveCircuit circuit={circuit} closeModal={closeModal} />);
  };

  return (
    <div className="p-2 hover:bg-gray-200" onClick={handleClick}>
      Удалить
    </div>
  );
};
