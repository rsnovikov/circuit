import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { ElementTypesEnum } from '@/entities/cirElement/model/ElementTypesEnum';
import { initialCirElementList } from '@/entities/cirElement/model/InitialCirElementList';
import { setPickedElement } from '@/entities/cirElement/model/slice';
import { ICirElement } from '@/entities/cirElement/model/types';
import { calculateSameTypeElements } from '@/entities/circuit/lib/calculateSameTypeElements';
import { transformCoords } from '@/shared/lib/transformCoords';

export const addPickedElementAction =
  ({ elementType, x, y }: { elementType: ElementTypesEnum; x: number; y: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const cirElement = Object.values(initialCirElementList).find(
      (item) => item.type === elementType
    );
    if (!cirElement) return;
    const {
      circuit: { scale, translateCoords },
      cirElement: { elements },
    } = getState();
    const breadboardCirElement: ICirElement = {
      type: cirElement.type,
      id: nanoid(),
      rotate: 0,
      ...transformCoords({ x, y, scale, translateCoords }),
      personalName: String(calculateSameTypeElements(elements, elementType)),
      physData: Object.keys(cirElement.physData).reduce(
        (acc, key) => ({ ...acc, [key]: { value: cirElement.physData[key].value } }),
        {}
      ),
    };
    dispatch(setPickedElement(breadboardCirElement));
  };
