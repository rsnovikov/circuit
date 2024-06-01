import { AppDispatch, RootState } from "@/app/appStore";
import { ElementTypesEnum } from "@/entities/cirElement/model/ElementTypesEnum";
import { lampExecuteAction } from "./lampExecuteAction";
import { relayExecuteAction } from "./relayExecuteAction";

type ExecuteCirElementActionRecord =  {
	[key in ElementTypesEnum]?: ((cirElemId: string) => (dispatch: AppDispatch, getState: () => RootState) => void)
}

export const executeCirElementActionRecord: ExecuteCirElementActionRecord = {
	[ElementTypesEnum.Lamp]: lampExecuteAction,
	[ElementTypesEnum.Relay]: relayExecuteAction
}