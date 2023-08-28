import { AppDispatch, RootState } from '@/app/appStore';
import { updateNodeById } from '@/entities/node';
import { updateWiresCoordsByNodeAction } from '@/entities/wire/model/actions/updateWiresCoordsByNodeAction';
import { transformCoords } from '@/shared/lib/transformCoords';
import { ICoords } from '@/shared/model/types';

export const updateDraggableNodeAction =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      circuit: { scale },
      node: { nodes, draggableNode },
    } = getState();

    if (!draggableNode) return;
    const node = nodes.find((node) => node.id === draggableNode.elementId);
    if (!node) return;
    const { offsetX, offsetY } = draggableNode;
    const { x: transformedX, y: transformedY } = transformCoords({ x, y, scale });

    const updatedNode = {
      ...node,
      x: transformedX - offsetX,
      y: transformedY - offsetY,
    };

    dispatch(updateWiresCoordsByNodeAction(updatedNode));

    dispatch(
      updateNodeById({
        id: updatedNode.id,
        updatedNode,
      })
    );
  };
