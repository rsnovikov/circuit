import { AppDispatch, RootState } from "@/app/appStore";
import { selectCirElementById, updateElementById } from "@/entities/cirElement/model/slice";

export const lampExecuteAction = (cirElemId: string ) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
		const cirElement = selectCirElementById(cirElemId)(getState());
			dispatch(updateElementById({id: cirElemId, updatedElement: {power:cirElement?.physData?.current?.value ||  null }}))
	}