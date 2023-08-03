import { FC } from 'react';
import { ceilTo } from '@/shared/lib/ceilTo';
import { roundTo } from '@/shared/lib/roundTo';
import { IBreadboardLine } from '../model/types';

interface IBreadboardGridProps {
  gridStep: number;
  width?: number;
  height?: number;
  scale: number;
  translateX: number;
  translateY: number;
}

export const BreadboardGrid: FC<IBreadboardGridProps> = ({
  gridStep,
  width,
  height,
  scale,
  translateX,
  translateY,
}) => {
  if (!width || !height) return;

  const getLinesArr = (): IBreadboardLine[] => {
    const linesArr: IBreadboardLine[] = [];

    for (let i = 1; i < width / gridStep / scale; i++) {
      const x = roundTo(i * gridStep - translateX / scale, gridStep);
      const verticalLine: IBreadboardLine = {
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
        y1: y,
        y2: y,
        x1: roundTo(-translateX / scale, gridStep),
        x2: roundTo(width / scale - translateX / scale, gridStep),
      };
      linesArr.push(horizontalLine);
    }
    return linesArr;
  };

  const lines = getLinesArr();

  return (
    <g transform={`matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`}>
      {lines.map(({ x1, x2, y1, y2 }) => (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0, 0, 0, 0.3)" />
      ))}
    </g>
  );
};
