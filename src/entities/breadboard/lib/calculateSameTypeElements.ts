import { ElementTypesEnum } from '@/shared/model/ElementTypesEnum';
import { IBreadboardCirElement } from '../model/types';

export const calculateSameTypeElements = (
  elements: IBreadboardCirElement[],
  type: ElementTypesEnum
) => elements.reduce((acc, item) => (item.type === type ? acc + 1 : acc), 1);
