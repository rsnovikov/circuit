import { AppDispatch, RootState } from '@/app/appStore';
import { selectCirElementById, updateElementById } from '@/entities/cirElement/model/slice';
import { startModelingAction } from '@/features/circuitTools/model/startModelingAction';

export const relayExecuteAction =
    (cirElemId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
        const cirElement = selectCirElementById(cirElemId)(getState());
        dispatch(
            updateElementById({
                id: cirElemId,
                updatedElement: { power: Math.abs(cirElement?.physData?.current?.value || 0) > 0 ? 1 : 0 },
            })
        );

        //TODO: надо сделать изменение нод

        // dispatch(startModelingAction());
    };
