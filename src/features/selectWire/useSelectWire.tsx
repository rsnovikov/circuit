import { addSelectedWireId } from '@/entities/wire';
import { useAppDispatch } from '@/shared/model';

export const useSelectWire = () => {
  const dispatch = useAppDispatch();

  const selectWire = (wireId: string) => {
    dispatch(addSelectedWireId(wireId));
  };

  return { selectWire };
};
