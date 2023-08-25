import { updateScale } from '@/entities/breadboard';
import { getMousePosition } from '@/shared/lib/getMouseCoords';
import { useBreadboardSvgRef } from '@/shared/lib/hooks/useBreadboardSvgRef';
import { useAppDispatch } from '@/shared/model';

export const useScaleBreadboard = () => {
  const dispatch = useAppDispatch();
  const svgRef = useBreadboardSvgRef();

  const scaleBreadboard = ({
    clientX,
    clientY,
    deltaX,
    deltaY,
  }: {
    clientX: number;
    clientY: number;
    deltaX: number;
    deltaY: number;
  }) => {
    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;
    const delta = deltaY || deltaX;
    const scaleStep = Math.abs(delta) < 50 ? 0.1 : 0.2;
    const scaleDelta = delta < 0 ? scaleStep : -scaleStep;

    dispatch(updateScale(scaleDelta, coords));
  };

  return { scaleBreadboard };
};
