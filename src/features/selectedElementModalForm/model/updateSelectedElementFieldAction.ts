import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import { AppDispatch, RootState } from '@/app/appStore';
import { updateElementById } from '@/entities/cirElement/model/slice';

export const updateSelectedElementFieldAction =
  ({ path, value }: { path: string; value: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { elements, selectedElementId } = getState().cirElement;
    const selectedElement = elements.find((element) => element.id === selectedElementId);
    if (!selectedElement) return;
    const updatedSelectedElement = cloneDeep(selectedElement);
    set(updatedSelectedElement, path, value);
    dispatch(
      updateElementById({ id: updatedSelectedElement.id, updatedElement: updatedSelectedElement })
    );
  };
