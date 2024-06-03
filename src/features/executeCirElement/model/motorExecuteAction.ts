import { AppDispatch, RootState } from '@/app/appStore';
import { selectCirElementById, updateElementById } from '@/entities/cirElement/model/slice';
import { calculatePower } from "@/shared/lib/calculatePower";


export const motorExecuteAction =
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
