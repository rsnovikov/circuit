import { AppDispatch, RootState } from '@/app/appStore';
import { updateNodeById } from '@/entities/node';
import { setDraggableNode } from '@/entities/node/model/slice';
import { updateWiresCoordsByNodeAction } from '@/entities/wire/model/actions/updateWiresCoordsByNodeAction';
import { roundTo } from '@/shared/lib/roundTo';

export const confirmDraggableNodeAction =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      node: { nodes, draggableNode },
      circuit: { gridStep },
    } = getState();

    if (!draggableNode) return;
    const node = nodes.find((node) => node.id === draggableNode.elementId);
    if (!node) return;

    const updatedNode = {
      ...node,
      x: roundTo(node.x, gridStep),
      y: roundTo(node.y, gridStep),
    };

    dispatch(updateWiresCoordsByNodeAction(updatedNode));

    dispatch(
      updateNodeById({
        id: updatedNode.id,
        updatedNode,
      })
    );

    dispatch(setDraggableNode(null));
  };
