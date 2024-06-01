import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { addSelectedWireIdAction } from './addSelectedWireIdAction';
import { setSelectedWireId } from "@/entities/wire/model/slice";

export const useSelectWire = () => {
  const dispatch = useAppDispatch();

  const selectWire = (wireId: string) => {
    dispatch(addSelectedWireIdAction(wireId));
  };

  const unselectWire = () => {
    dispatch(setSelectedWireId(null));
  };

  useKeyDown({ callback: unselectWire, codes: ['Escape'] });

  return { selectWire, unselectWire };
};
