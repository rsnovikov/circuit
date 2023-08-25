import { addSelectedElementId, removeSelectedElementId } from '@/entities/breadboard/model/slice';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';

export const useSelectBreadboardElement = () => {
  const dispatch = useAppDispatch();

  const selectElement = ({ elementId }: { elementId: string }) => {
    dispatch(addSelectedElementId(elementId));
  };

  const unselectElement = () => {
    dispatch(removeSelectedElementId());
  };

  useKeyDown({ callback: unselectElement, codes: ['Escape'] });

  return { selectElement, unselectElement };
};
