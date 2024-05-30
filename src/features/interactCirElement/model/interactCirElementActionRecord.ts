import { AppDispatch, RootState } from "@/app/appStore";
import { ElementTypesEnum } from "@/entities/cirElement/model/ElementTypesEnum";
import { keyInteractAction } from "./keyInteractAction";

type InteractCirElementActionRecord =  {
	[key in ElementTypesEnum]?: ((cirElemId: string) => (dispatch: AppDispatch, getState: () => RootState) => void)
}

export const interactCirElementActionRecord: InteractCirElementActionRecord = {
	[ElementTypesEnum.Key]: keyInteractAction
}