import { FC } from 'react';
import { roundTo } from '@/shared/lib/roundTo';
import { useAppSelector } from '@/shared/model';
import { IBreadboardLine } from '../model/types';

interface IBreadboardGridProps {
  width?: number;
  height?: number;
}

export const BreadboardGrid: FC<IBreadboardGridProps> = ({ width, height }) => {
  const isGridVisible = useAppSelector((state) => state.breadboard.isGridVisible);
  const gridStep = useAppSelector((state) => state.breadboard.gridStep);
  const scale = useAppSelector((state) => state.breadboard.scale);
  const { translateX, translateY } = useAppSelector((state) => state.breadboard.translateCoords);

  if (!isGridVisible || !width || !height) return;

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
