import { FC } from 'react';
import { ICirWire } from '@/entities/breadboard/model/types';

interface IWireProps {
  wire: ICirWire;
}

export const Wire: FC<IWireProps> = ({ wire }) => {
  const { x1, y1, x2, y2, color } = wire;
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} />;
};
