import { setDrawingWire } from '@/entities/wire';
import { getMousePosition } from '@/shared/lib/getMouseCoords';
import { useBreadboardSvgRef } from '@/shared/lib/hooks/useBreadboardSvgRef';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch } from '@/shared/model';
import { confirmWireAndAddNodeAction } from './confirmWireAndAddNodeAction';
import { updateDrawingWireCoordsAction } from './updateDrawingWireCoordsAction';

export const useDrawWire = () => {
  const dispatch = useAppDispatch();
  const svgRef = useBreadboardSvgRef();

  const updateDrawingWire = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;
    dispatch(updateDrawingWireCoordsAction(coords));
  };

  const confirmWireToBreadboard = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;
    dispatch(confirmWireAndAddNodeAction(coords));
  };

  useKeyDown({
    callback: () => {
      dispatch(setDrawingWire(null));
    },
    codes: ['Escape'],
  });

  return { updateDrawingWire, confirmWireToBreadboard };
};
