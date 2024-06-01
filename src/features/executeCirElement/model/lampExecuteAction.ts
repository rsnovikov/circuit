import { AppDispatch, RootState } from '@/app/appStore';
import { selectCirElementById, updateElementById } from '@/entities/cirElement/model/slice';
import { ICirElementPhysData } from '@/entities/cirElement/model/types';

const calculatePower = (physData: ICirElementPhysData | undefined) => {
	if (!physData) {
		return 0;
	}
	const V = physData?.voltage?.value || 0;
	const I = physData?.current?.value || 0;
	const maxVoltage = physData?.maxVoltage?.value || 5;
	const R = physData?.resistance?.value || 5;
	return (V * I) / (maxVoltage ** 2 / R);
};

export const lampExecuteAction =
	(cirElemId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
		const cirElement = selectCirElementById(cirElemId)(getState());
		dispatch(
			updateElementById({
				id: cirElemId,
				updatedElement: {
					power: calculatePower(cirElement?.physData),
				},
			})
		);
	};
