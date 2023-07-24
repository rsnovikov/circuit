import { FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { addSelectedWireId } from '..';
import { ICirWire } from '../model/types';

interface IWireProps {
  wire: ICirWire;
}

export const Wire: FC<IWireProps> = ({ wire }) => {
  const { id, x1, y1, x2, y2, color } = wire;

  const dispatch = useAppDispatch();

  const selectedWireId = useAppSelector((state) => state.wire.selectedWireId);

  const handleMouseDown: MouseEventHandler = () => {
    dispatch(addSelectedWireId(id));
  };

  return (
    <g onClick={handleMouseDown}>
      {selectedWireId === id && (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={8} strokeOpacity={0.4} />
      )}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} fill="green" strokeWidth={4} />
    </g>
  );
};
