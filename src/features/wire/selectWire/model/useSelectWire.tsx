import { setSelectedElementId } from '@/entities/cirElement/model/slice';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { addSelectedWireIdAction } from './addSelectedWireIdAction';

export const useSelectWire = () => {
  const dispatch = useAppDispatch();

  const selectWire = (wireId: string) => {
    dispatch(addSelectedWireIdAction(wireId));
  };

  const unselectWire = () => {
    dispatch(setSelectedElementId(null));
  };

  useKeyDown({ callback: unselectWire, codes: ['Escape'] });

  return { selectWire, unselectWire };
};
