import { AppDispatch, RootState } from "@/app/appStore";
import { selectCirElementById, updateElementById } from "@/entities/cirElement/model/slice";
import { updateNodeById } from "@/entities/node";


const toggleNodeConnection = (connectionIds: string[], connectedNodeId: string) => {
	if(connectionIds.includes(connectedNodeId)) {
		return connectionIds.filter(item => item !== connectedNodeId);
	} else {
		return [...connectionIds, connectedNodeId]
	}
}

export const keyInteractAction = (cirElemId: string ) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const cirElement = selectCirElementById(cirElemId)(state);
		console.log(cirElement);

		
			dispatch(updateElementById({id: cirElemId, updatedElement: {power: !cirElement?.power ? 1 : 0 }}))

			const [firstNode, secondNode] = state.node.nodes.filter(item => item.relatedElement?.elementId === cirElemId);

		dispatch(updateNodeById({id: firstNode.id, updatedNode: {connectionIds: toggleNodeConnection(firstNode.connectionIds, secondNode.id)}}))

		dispatch(updateNodeById({id: secondNode.id, updatedNode: {connectionIds: toggleNodeConnection(secondNode.connectionIds, firstNode.id)}}))
	}
