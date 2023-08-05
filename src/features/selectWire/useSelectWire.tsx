import { addSelectedWireId, removeSelectedWireId } from '@/entities/wire';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const useSelectWire = () => {
  const dispatch = useAppDispatch();

  const selectWire = (wireId: string) => {
    dispatch(addSelectedWireId(wireId));
  };

  const unselectWire = () => {
    dispatch(removeSelectedWireId());
  };

  useKeyDown({ callback: unselectWire, codes: ['Escape'] });

  return { selectWire, unselectWire };
};
