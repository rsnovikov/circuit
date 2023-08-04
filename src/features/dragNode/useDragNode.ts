import { addDraggableNode, confirmDraggableNode } from '@/entities/node';
import { useAppDispatch } from '@/shared/model';

export const useDragNode = () => {
  const dispatch = useAppDispatch();

  const startDragNode = (params: { clientX: number; clientY: number; nodeId: string }) => {
    dispatch(addDraggableNode(params));
  };

  const endDragNode = () => {
    dispatch(confirmDraggableNode());
  };

  return { startDragNode, endDragNode };
};
