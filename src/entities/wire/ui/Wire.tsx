import { FC, HTMLAttributes } from 'react';
import { ICirWire } from '../model/types';

interface IWireProps extends HTMLAttributes<SVGGElement> {
  wire: ICirWire;
  selectedWireId?: string | null;
}

export const Wire: FC<IWireProps> = ({ wire, selectedWireId, ...rest }) => {
  const { id, x1, y1, x2, y2, color } = wire;

  return (
    <g {...rest}>
      {selectedWireId === id && (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={8} strokeOpacity={0.4} />
      )}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} fill="green" strokeWidth={4} />
    </g>
  );
};
