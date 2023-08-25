import { addDraggableNode, confirmDraggableNode, updateDraggableNode } from '@/entities/node';
import { useAppDispatch } from '@/shared/model';

export const useDragNode = () => {
  const dispatch = useAppDispatch();
  const startDragNode = (params: { clientX: number; clientY: number; nodeId: string }) => {
    dispatch(addDraggableNode(params));
  };

  const dragNode = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    dispatch(updateDraggableNode({ x: clientX, y: clientY }));
  };

  const endDragNode = () => {
    dispatch(confirmDraggableNode());
  };

  return { startDragNode, dragNode, endDragNode };
};
