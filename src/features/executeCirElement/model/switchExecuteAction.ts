import { AppDispatch, RootState } from '@/app/appStore';
import { selectCirElementById, setIsNeedModelingAfterChanges, updateElementById } from '@/entities/cirElement/model/slice';
import { updateNodeById } from "@/entities/node";
import { connected } from 'process';

const toggleNodeConnection = (connectionIds: string[], connectedNodeId: string) => {
    if (connectionIds.includes(connectedNodeId)) {
        return connectionIds.filter(item => item !== connectedNodeId);
    } else {
        return [...connectionIds, connectedNodeId]
    }
}

const disconnectNodes = (connectionIds: string[], connectedNodeIds: string[]) => connectionIds.filter(item => !connectedNodeIds.includes(item))
const connectNodes = (connectionIds: string[], connectedNodeIds: string[]) => [...connectionIds, ...connectedNodeIds]

const getPreviousStatus = (FNconnectionIds: string[], secondNodeId: string) => FNconnectionIds.includes(secondNodeId)

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
        const [, , firstNode, secondNode, thirdNode] = state.node.nodes.filter(item => item.relatedElement?.elementId === cirElemId);


        if (getPreviousStatus(firstNode.connectionIds, secondNode.id) !== Boolean(currentStatus)) {
            console.log('Connection status changed');
            dispatch(setIsNeedModelingAfterChanges(true))
            if (currentStatus === 1) {
                dispatch(updateNodeById({ id: firstNode.id, updatedNode: { connectionIds: disconnectNodes(firstNode.connectionIds, [secondNode.id]) } }))
                dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: disconnectNodes(secondNode.connectionIds, [firstNode.id]) } }))
                dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: connectNodes(secondNode.connectionIds, [thirdNode.id]) } }))
                dispatch(updateNodeById({ id: thirdNode.id, updatedNode: { connectionIds: connectNodes(thirdNode.connectionIds, [secondNode.id]) } }))
            } else {
                dispatch(updateNodeById({ id: firstNode.id, updatedNode: { connectionIds: connectNodes(firstNode.connectionIds, [secondNode.id]) } }))
                dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: connectNodes(secondNode.connectionIds, [firstNode.id]) } }))
                dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: disconnectNodes(secondNode.connectionIds, [thirdNode.id]) } }))
                dispatch(updateNodeById({ id: thirdNode.id, updatedNode: { connectionIds: disconnectNodes(thirdNode.connectionIds, [secondNode.id]) } }))
            }
        }
    };
