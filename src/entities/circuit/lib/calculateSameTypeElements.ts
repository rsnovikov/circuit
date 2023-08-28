import { ElementTypesEnum } from '@/entities/cirElement/model/ElementTypesEnum';
import { ICirElement } from '@/entities/cirElement/model/types';

export const calculateSameTypeElements = (elements: ICirElement[], type: ElementTypesEnum) =>
  elements.reduce((acc, item) => (item.type === type ? acc + 1 : acc), 1);
