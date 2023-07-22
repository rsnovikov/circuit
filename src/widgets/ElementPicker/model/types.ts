import { ElementTypesEnum } from '@/shared/model/ElementTypesEnum';

export interface IPickerElement {
  type: ElementTypesEnum;
  name: string;
  previewImgPath: string;
}
