import { confirmWireAndAddNode, removeDrawingWire, updateDrawingWireCoords } from '@/entities/wire';
import { useBreadboardSvgRef } from '@/shared/lib/BreadboardSvgProvider';
import { getMousePosition } from '@/shared/lib/getMouseCoords';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const useDrawWire = () => {
  const dispatch = useAppDispatch();
  const svgRef = useBreadboardSvgRef();

  const updateDrawingWire = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;
    dispatch(updateDrawingWireCoords(coords));
  };

  const confirmWireToBreadboard = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;
    dispatch(confirmWireAndAddNode(coords));
  };

  useKeyDown({
    callback: () => {
      dispatch(removeDrawingWire());
    },
    codes: ['Escape'],
  });

  return { updateDrawingWire, confirmWireToBreadboard };
};
