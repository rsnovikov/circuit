import { setSelectedElementId } from '@/entities/cirElement/model/slice';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { selectNodeAction } from './selectNodeAction';

export const useSelectNode = () => {
  const dispatch = useAppDispatch();
  const selectNode = ({ nodeId }: { nodeId: string }) => {
    dispatch(selectNodeAction(nodeId));
  };

  const unselectNode = () => {
    dispatch(setSelectedElementId(null));
  };

  useKeyDown({ callback: unselectNode, codes: ['Escape'] });

  return { selectNode, unselectNode };
};
