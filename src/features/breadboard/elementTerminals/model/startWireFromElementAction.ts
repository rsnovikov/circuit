import { AppDispatch, RootState } from '@/app/appStore';
import { getWirePosByElement } from '@/entities/wire/lib/getWirePosByElement';
import { startWireAction } from '@/entities/wire/model/actions/startWireAction';

export const startWireFromElementAction =
  ({ elementId, terminalId }: { elementId: string; terminalId: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      cirElement: { elements },
      node: { nodes },
    } = getState();
    const startNode = nodes.find(
      (node) =>
        node.relatedElement?.elementId === elementId &&
        node.relatedElement?.terminalId === terminalId
    );
    const element = elements.find((element) => element.id === elementId);
    if (!startNode || !element) return;

    const { x, y } = getWirePosByElement({ element, node: startNode });

    dispatch(
      startWireAction({
        startNodeId: startNode.id,
        x1: x,
        y1: y,
      })
    );
  };
