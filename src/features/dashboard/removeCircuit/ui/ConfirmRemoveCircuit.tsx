import { FC } from 'react';
import { useRemoveCircuitMutation } from '@/entities/circuit/api/api';
import { CircuitListItem } from '@/entities/circuit/api/types';
import { useAppDispatch } from '@/shared/model';
import { notify } from '@/shared/notification';
import { Btn } from '@/shared/ui/Btn/Btn';

interface IConfirmRemoveCircuitProps {
  circuit: CircuitListItem;
  closeModal: () => void;
}

export const ConfirmRemoveCircuit: FC<IConfirmRemoveCircuitProps> = ({ circuit, closeModal }) => {
  const [remove, { isLoading }] = useRemoveCircuitMutation();

  const dispatch = useAppDispatch();

  const confirmRemove = async () => {
    try {
      await remove(circuit._id).unwrap();
      dispatch(notify({ message: `Схема "${circuit.name}" успешно удалена`, type: 'success' }));
    } catch (e) {
      dispatch(notify({ message: `Ошибка при удалении схемы "${circuit.name}"`, type: 'error' }));
    } finally {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-xl">Удалить схему &quot;{circuit.name}&quot;?</h4>
      <h6 className="text-sm fold-bold text-red-700 mb-4">Это действие нельзя будет отменить</h6>
      <Btn isLoading={isLoading} onClick={confirmRemove}>
        Удалить
      </Btn>
    </div>
  );
};
