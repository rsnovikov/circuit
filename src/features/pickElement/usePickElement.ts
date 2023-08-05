import {
  addPickedElement as addPickedElementAction,
  confirmPickedElement as confirmPickedElementAction,
  updatePickedElementCoords,
  removePickedElement,
} from '@/entities/breadboard';
import { useBreadboardSvgRef } from '@/shared/lib/BreadboardSvgProvider';
import { getMousePosition } from '@/shared/lib/getMouseCoords';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { ElementTypesEnum } from '@/shared/model/ElementTypesEnum';

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
