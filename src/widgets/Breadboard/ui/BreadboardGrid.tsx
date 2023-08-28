import { FC, useEffect, useState } from 'react';
import { useBreadboardSvgRef } from '@/shared/lib/hooks/useBreadboardSvgRef';
import { roundTo } from '@/shared/lib/roundTo';
import { useAppSelector } from '@/shared/model';
import { IBreadboardLine } from '../model/types';

export const BreadboardGrid: FC = () => {
  const svgRef = useBreadboardSvgRef();

  const [{ width, height }, setSvgDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!svgRef.current) return;
    setSvgDimensions({ width: svgRef.current.clientWidth, height: svgRef.current.clientHeight });
  }, [svgRef.current]);

  const isGridVisible = useAppSelector((state) => state.circuit.isGridVisible);
  const gridStep = useAppSelector((state) => state.circuit.gridStep);
  const scale = useAppSelector((state) => state.circuit.scale);
  const { translateX, translateY } = useAppSelector((state) => state.circuit.translateCoords);

  if (!isGridVisible || !width || !height) return;

  const getLinesArr = (): IBreadboardLine[] => {
    const linesArr: IBreadboardLine[] = [];

    for (let i = 1; i < width / gridStep / scale; i++) {
      const x = roundTo(i * gridStep - translateX / scale, gridStep);

      const verticalLine: IBreadboardLine = {
        id: `vertical${x}`,
        y1: roundTo(-translateY / scale, gridStep),
        y2: roundTo(height / scale - translateY / scale, gridStep),
        x1: x,
        x2: x,
      };
      linesArr.push(verticalLine);
    }

    for (let i = 1; i < height / gridStep / scale; i++) {
      const y = roundTo(i * gridStep - translateY / scale, gridStep);

      const horizontalLine: IBreadboardLine = {
        id: `horizontal${y}`,
        y1: y,
        y2: y,
        x1: roundTo(-translateX / scale, gridStep),
        x2: roundTo(width / scale - translateX / scale, gridStep),
      };
      linesArr.push(horizontalLine);
    }
    return linesArr;
  };

  return (
    <g transform={`matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`}>
      {getLinesArr().map(({ id, x1, x2, y1, y2 }) => (
        <line key={id} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0, 0, 0, 0.3)" />
      ))}
    </g>
  );
};
