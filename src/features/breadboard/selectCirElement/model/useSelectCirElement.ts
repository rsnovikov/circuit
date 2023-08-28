import { setSelectedElementId } from '@/entities/cirElement/model/slice';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { addSelectedElementIdACtion } from './addSelectedElementIdAction';

export const useSelectCirElement = () => {
  const dispatch = useAppDispatch();

  const selectElement = ({ elementId }: { elementId: string }) => {
    dispatch(addSelectedElementIdACtion(elementId));
  };

  const unselectElement = () => {
    dispatch(setSelectedElementId(null));
  };

  useKeyDown({ callback: unselectElement, codes: ['Escape'] });

  return { selectElement, unselectElement };
};
