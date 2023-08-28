import { AppDispatch, RootState } from '@/app/appStore';
import { setDraggableNode } from '@/entities/node/model/slice';
import { transformCoords } from '@/shared/lib/transformCoords';

export const addDraggableNodeAction =
  ({ nodeId, clientX, clientY }: { nodeId: string; clientX: number; clientY: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      circuit: { scale },
      node: { nodes },
    } = getState();

    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return;
    const { x, y } = node;
    const { x: transformedInitialX, y: transformedInitialY } = transformCoords({
      x: clientX,
      y: clientY,
      scale,
    });
    const offsetX = transformedInitialX - x;
    const offsetY = transformedInitialY - y;
    dispatch(
      setDraggableNode({
        elementId: node.id,
        initialX: x,
        initialY: y,
        offsetX,
        offsetY,
      })
    );
  };
