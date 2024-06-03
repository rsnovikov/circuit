import { AppDispatch, RootState } from '@/app/appStore';
import { selectCirElementById, updateElementById } from '@/entities/cirElement/model/slice';
import { updateNodeById } from "@/entities/node";

const toggleNodeConnection = (connectionIds: string[], connectedNodeId: string) => {
    if (connectionIds.includes(connectedNodeId)) {
        return connectionIds.filter(item => item !== connectedNodeId);
    } else {
        return [...connectionIds, connectedNodeId]
    }
}

let status = 0

export const relayExecuteAction =
    (cirElemId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState();
        const cirElement = selectCirElementById(cirElemId)(getState());
        const currentStatus = Math.abs(cirElement?.physData?.current?.value || 0) > 0 ? 1 : 0
        dispatch(
            updateElementById({
                id: cirElemId,
                updatedElement: { power: currentStatus },
            })
        );
        if (status !== currentStatus) {
            status = currentStatus
            const [, , firstNode, secondNode] = state.node.nodes.filter(item => item.relatedElement?.elementId === cirElemId);
            console.log('1', toggleNodeConnection(firstNode.connectionIds, secondNode.id));
            console.log('1', toggleNodeConnection(secondNode.connectionIds, firstNode.id));
            dispatch(updateNodeById({ id: firstNode.id, updatedNode: { connectionIds: toggleNodeConnection(firstNode.connectionIds, secondNode.id) } }))

            dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: toggleNodeConnection(secondNode.connectionIds, firstNode.id) } }))
        }

        // Сюда добавлять обработку цепи это полная хуйня, оно должно быть уровнем выше.
    };
