import { AppDispatch, RootState } from "@/app/appStore";
import { initialCirElementList } from "@/entities/cirElement/model/InitialCirElementList";
import { setIsNeedModelingAfterChanges, updateElementById } from "@/entities/cirElement/model/slice";
import { ICirElement, ICirElementPhysData } from "@/entities/cirElement/model/types";
import { CircuitData } from "@/entities/circuit/api/types";
import { executeCirElementActionRecord } from "@/features/executeCirElement";
import { notify } from "@/shared/notification";
import { analyzeCircuit } from 'MNA/analyzeCircuit';

export const startModelingAction = () =>
	(dispatch: AppDispatch, getState: () => RootState) => {
		dispatch(setIsNeedModelingAfterChanges(false))
		const { node: { nodes }, cirElement: { elements } } = getState();

		const currentData: CircuitData = JSON.parse(JSON.stringify({ nodes, elements }))
		try {
			const elementsToChange: ICirElement[] = analyzeCircuit(JSON.parse(JSON.stringify(currentData)))
			const updatedElementList = currentData.elements.map(e => {
				const index: number = elementsToChange.findIndex(element => element.id === e.id)

				const initialElementPhysData = initialCirElementList[e.type].physData;

				return index >= 0 ? { id: elementsToChange[index].id, physData: elementsToChange[index].physData, type: e.type } : {
					id: e.id,
					type: e.type,
					physData: Object.keys(e.physData).reduce((acc, physDataItemKey) => {
						if (initialElementPhysData[physDataItemKey].isChangeable) {
							return { ...acc, [physDataItemKey]: e.physData[physDataItemKey] }
						}
						return {
							...acc,
							[physDataItemKey]: { value: 0 }
						}
					}, {} as ICirElementPhysData)
				};
			}
			)

			// dispatch(setCirElements(updatedElementList));
			updatedElementList.forEach((cirElem) => {
				const action = executeCirElementActionRecord[cirElem.type];

				dispatch(updateElementById({ id: cirElem.id, updatedElement: cirElem }))

				if (action) {
					dispatch(action(cirElem.id));
				}

			})

			const { cirElement: {isNeedModelingAfterChanges} } = getState();

			if(isNeedModelingAfterChanges) {
				dispatch(startModelingAction());
			}
		} catch (error) {
			console.error(error);
			dispatch(notify({ message: 'Ошибка при просчете', type: 'error' }));
		}
	}