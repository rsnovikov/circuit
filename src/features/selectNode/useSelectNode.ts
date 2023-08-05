import { addSelectedNodeId, removeSelectedNodeId } from '@/entities/node/model/slice';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch } from '@/shared/model';

export const useSelectNode = () => {
  const dispatch = useAppDispatch();
  const selectNode = ({ nodeId }: { nodeId: string }) => {
    dispatch(addSelectedNodeId(nodeId));
  };

  const unselectNode = () => {
    dispatch(removeSelectedNodeId());
  };

  useKeyDown({ callback: unselectNode, codes: ['Escape'] });

  return { selectNode, unselectNode };
};
