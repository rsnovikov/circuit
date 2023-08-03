import { FC } from 'react';
import { Wire } from '@/entities/wire';
import { useAppSelector } from '@/shared/model';

export const BreadboardDrawingWire: FC = ({}) => {
  const drawingWire = useAppSelector((state) => state.wire.drawingWire);
  return drawingWire && <Wire wire={drawingWire} />;
};
