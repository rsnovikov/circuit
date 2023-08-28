import { ElementTypesEnum } from '@/entities/cirElement/model/ElementTypesEnum';
import { setPickedElement } from '@/entities/cirElement/model/slice';
import { getMousePosition } from '@/shared/lib/getMouseCoords';
import { useBreadboardSvgRef } from '@/shared/lib/hooks/useBreadboardSvgRef';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { addPickedElementAction } from './addPickedElementAction';
import { confirmPickedElementAction } from './confirmPickedElementActions';
import { updatePickedElementCoordsAction } from './updatePickedElementCoordsAction';

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
    dispatch(updatePickedElementCoordsAction(coords));
  };

  const confirmPickedElement = () => {
    dispatch(confirmPickedElementAction());
  };

  const handleKeyDown = () => {
    dispatch(dispatch(setPickedElement(null)));
  };

  useKeyDown({ callback: handleKeyDown, codes: ['Escape'] });

  return { addPickedElement, movePickedElement, confirmPickedElement };
};
