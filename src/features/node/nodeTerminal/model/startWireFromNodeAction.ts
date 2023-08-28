import { AppDispatch, RootState } from '@/app/appStore';
import { startWireAction } from '@/entities/wire/model/actions/startWireAction';

export const startWireFromNodeAction =
  (startNodeId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { nodes } = getState().node;
    const startNode = nodes.find((node) => node.id === startNodeId);

    if (!startNode) return;

    dispatch(
      startWireAction({
        startNodeId: startNode.id,
        x1: startNode.x,
        y1: startNode.y,
      })
    );
  };
