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

export const switchExecuteAction =
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
            const [, , firstNode, secondNode, thirdNode] = state.node.nodes.filter(item => item.relatedElement?.elementId === cirElemId);
            dispatch(updateNodeById({ id: firstNode.id, updatedNode: { connectionIds: toggleNodeConnection(firstNode.connectionIds, secondNode.id) } }))
            dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: toggleNodeConnection(secondNode.connectionIds, firstNode.id) } }))
            dispatch(updateNodeById({ id: thirdNode.id, updatedNode: { connectionIds: toggleNodeConnection(thirdNode.connectionIds, secondNode.id) } }))
            dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: toggleNodeConnection(secondNode.connectionIds, thirdNode.id) } }))
        }

        // Сюда добавлять обработку цепи это полная хуйня, оно должно быть уровнем выше.
    };
