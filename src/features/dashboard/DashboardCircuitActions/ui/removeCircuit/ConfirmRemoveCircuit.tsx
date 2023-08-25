import { FC } from 'react';
import { useRemoveBreadboardMutation } from '@/entities/breadboard/api/api';
import { CircuitListItem } from '@/entities/breadboard/api/types';
import { notify } from '@/features/notification';
import { useAppDispatch } from '@/shared/model';
import { Btn } from '@/shared/ui/Btn/Btn';

interface IConfirmRemoveCircuitProps {
  circuit: CircuitListItem;
  closeModal: () => void;
}

export const ConfirmRemoveCircuit: FC<IConfirmRemoveCircuitProps> = ({ circuit, closeModal }) => {
  const [removeBreadboard, { isLoading }] = useRemoveBreadboardMutation();

  const dispatch = useAppDispatch();

  const confirmRemove = async () => {
    try {
      await removeBreadboard(circuit._id).unwrap();
      dispatch(notify({ message: `Схема "${circuit.name}" успешно удалена`, type: 'success' }));
    } catch (e) {
      console.log(e);
      dispatch(notify({ message: `Ошибка при удалении схемы "${circuit.name}"`, type: 'error' }));
    } finally {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-xl">Удалить схему "{circuit.name}"?</h4>
      <h6 className="text-sm fold-bold text-red-700 mb-4">Это действие нельзя будет отменить</h6>
      <Btn isLoading={isLoading} onClick={confirmRemove}>
        Удалить
      </Btn>
    </div>
  );
};
