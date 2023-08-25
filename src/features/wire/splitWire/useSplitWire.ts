import { getMousePosition } from '@/shared/lib/getMouseCoords';
import { useBreadboardSvgRef } from '@/shared/lib/hooks/useBreadboardSvgRef';
import { useAppDispatch } from '@/shared/model';
import { splitWireAction } from './model/splitWireAction';
import { ISplitWireParams } from './model/types';

export const useSplitWire = () => {
  const dispatch = useAppDispatch();
  const svgRef = useBreadboardSvgRef();
  const splitWire = ({ clientX, clientY, ...rest }: ISplitWireParams) => {
    const coords = getMousePosition({ x: clientX, y: clientY }, svgRef.current?.getScreenCTM());
    if (!coords) return;
    dispatch(splitWireAction({ clientX: coords.x, clientY: coords.y, ...rest }));
  };

  return { splitWire };
};
