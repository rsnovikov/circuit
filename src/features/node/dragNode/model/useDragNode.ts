import { useAppDispatch } from '@/shared/model';
import { addDraggableNodeAction } from './addDraggableNodeAction';
import { confirmDraggableNodeAction } from './confirmDraggableNodeAction';
import { updateDraggableNodeAction } from './updateDraggableNodeAction';

export const useDragNode = () => {
  const dispatch = useAppDispatch();
  const startDragNode = (params: { clientX: number; clientY: number; nodeId: string }) => {
    dispatch(addDraggableNodeAction(params));
  };

  const dragNode = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    dispatch(updateDraggableNodeAction({ x: clientX, y: clientY }));
  };

  const endDragNode = () => {
    dispatch(confirmDraggableNodeAction());
  };

  return { startDragNode, dragNode, endDragNode };
};
