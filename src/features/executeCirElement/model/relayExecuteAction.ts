import { AppDispatch, RootState } from '@/app/appStore';
import { selectCirElementById, setIsNeedModelingAfterChanges, updateElementById } from '@/entities/cirElement/model/slice';
import { updateNodeById } from "@/entities/node";
import { startModelingAction } from "@/features/circuitTools/model/startModelingAction";

const toggleNodeConnection = (connectionIds: string[], connectedNodeId: string) => {
    if (connectionIds.includes(connectedNodeId)) {
        return connectionIds.filter(item => item !== connectedNodeId);
    } else {
        return [...connectionIds, connectedNodeId]
    }
}

const getPreviousStatus = (FNconnectionIds: string[], secondNodeId: string) => FNconnectionIds.includes(secondNodeId)

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
        const [, , firstNode, secondNode] = state.node.nodes.filter(item => item.relatedElement?.elementId === cirElemId);
        if (getPreviousStatus(firstNode.connectionIds, secondNode.id) !== Boolean(currentStatus)) {
            if(cirElement?.physData.delay.value) {
                setTimeout(() => {
                    dispatch(updateNodeById({ id: firstNode.id, updatedNode: { connectionIds: toggleNodeConnection(firstNode.connectionIds, secondNode.id) } }))
                    dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: toggleNodeConnection(secondNode.connectionIds, firstNode.id) } }))
            dispatch(startModelingAction())
                }, cirElement?.physData.delay.value)
            } else {

                dispatch(setIsNeedModelingAfterChanges(true))
                dispatch(updateNodeById({ id: firstNode.id, updatedNode: { connectionIds: toggleNodeConnection(firstNode.connectionIds, secondNode.id) } }))
                dispatch(updateNodeById({ id: secondNode.id, updatedNode: { connectionIds: toggleNodeConnection(secondNode.connectionIds, firstNode.id) } }))
            }
        }
    };
