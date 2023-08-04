import { addPickedElement, removePickedElement } from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { ElementTypesEnum } from '@/shared/model/ElementTypesEnum';

export const usePickElement = () => {
  const dispatch = useAppDispatch();

  const pickElement = ({
    elementType,
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
    elementType: ElementTypesEnum;
  }) => {
    dispatch(addPickedElement({ elementType, x: clientX, y: clientY }));
  };

  const handleKeyDown = () => {
    dispatch(removePickedElement());
  };

  useKeyDown({ callback: handleKeyDown, codes: ['Escape'] });

  return { pickElement };
};
