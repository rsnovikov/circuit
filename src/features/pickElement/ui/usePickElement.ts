import { MouseEventHandler } from 'react';
import { addPickedElement, removePickedElement } from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { ElementTypesEnum } from '@/shared/model/ElementTypesEnum';

interface IUsePickElementParams {
  elementType: ElementTypesEnum;
}

export const usePickElement = ({ elementType }: IUsePickElementParams) => {
  const dispatch = useAppDispatch();
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX: x, clientY: y } = e;

    dispatch(addPickedElement({ elementType, x, y }));
  };

  const handleKeyDown = () => {
    dispatch(removePickedElement());
  };

  useKeyDown(handleKeyDown, ['Escape']);

  return { handleMouseDown };
};
