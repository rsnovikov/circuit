import { FC } from 'react';
import { useUpdateCircuitMutation } from '@/entities/circuit/api/api';
import { selectWiresData } from '@/entities/wire/model/selectors';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { notify } from '@/shared/notification';
import { Btn } from '@/shared/ui/Btn/Btn';

export const SaveBreadboardBtn: FC = () => {
  const [update, { isLoading }] = useUpdateCircuitMutation();

  const circuitId = useAppSelector((state) => state.circuit._id);
  const elements = useAppSelector((state) => state.cirElement.elements);
  const nodes = useAppSelector((state) => state.node.nodes);
  const wires = useAppSelector(selectWiresData);

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (!circuitId) return;

    try {
      await update({ _id: circuitId, elements, nodes, wires }).unwrap();
    } catch (e) {
      dispatch(notify({ message: 'Ошибка при сохранении схемы', type: 'error' }));
    }
  };

  return (
    <Btn
      className="!bg-green-700 !hover:bg-green-800 focus:ring-green-500"
      onClick={handleClick}
      isLoading={isLoading}
    >
      Сохранить
    </Btn>
  );
};
