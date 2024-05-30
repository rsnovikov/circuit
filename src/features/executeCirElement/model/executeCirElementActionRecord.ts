import { AppDispatch, RootState } from "@/app/appStore";
import { ElementTypesEnum } from "@/entities/cirElement/model/ElementTypesEnum";
import { lampExecuteAction } from "./lampExecuteAction";

type ExecuteCirElementActionRecord =  {
	[key in ElementTypesEnum]?: ((cirElemId: string) => (dispatch: AppDispatch, getState: () => RootState) => void)
}

export const executeCirElementActionRecord: ExecuteCirElementActionRecord = {
	[ElementTypesEnum.Lamp]: lampExecuteAction
}