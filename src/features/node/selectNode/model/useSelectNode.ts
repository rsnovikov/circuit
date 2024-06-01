import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { selectNodeAction } from './selectNodeAction';
import { setSelectedNodeId } from "@/entities/node/model/slice";

export const useSelectNode = () => {
  const dispatch = useAppDispatch();
  const selectNode = ({ nodeId }: { nodeId: string }) => {
    dispatch(selectNodeAction(nodeId));
  };

  const unselectNode = () => {
    dispatch(setSelectedNodeId(null));
  };

  useKeyDown({ callback: unselectNode, codes: ['Escape'] });

  return { selectNode, unselectNode };
};
