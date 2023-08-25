import {
  addPickedElement as addPickedElementAction,
  confirmPickedElement as confirmPickedElementAction,
  removePickedElement,
  updatePickedElementCoords,
} from '@/entities/breadboard';
import { ElementTypesEnum } from '@/entities/breadboard/model/ElementTypesEnum';
import { getMousePosition } from '@/shared/lib/getMouseCoords';
import { useBreadboardSvgRef } from '@/shared/lib/hooks/useBreadboardSvgRef';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';

export const usePickElement = () => {
  const dispatch = useAppDispatch();
  const svgRef = useBreadboardSvgRef();

  const addPickedElement = ({
    elementType,
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
    elementType: ElementTypesEnum;
  }) => {
    dispatch(addPickedElementAction({ elementType, x: clientX, y: clientY }));
  };

  const movePickedElement = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;
    dispatch(updatePickedElementCoords(coords));
  };

  const confirmPickedElement = () => {
    dispatch(confirmPickedElementAction());
  };

  const handleKeyDown = () => {
    dispatch(removePickedElement());
  };

  useKeyDown({ callback: handleKeyDown, codes: ['Escape'] });

  return { addPickedElement, movePickedElement, confirmPickedElement };
};
