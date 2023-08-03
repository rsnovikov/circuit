import { FC } from 'react';
import { Wire } from '@/entities/wire';
import { useAppSelector } from '@/shared/model';

export const BreadboardWires: FC = () => {
  const wires = useAppSelector((state) => state.wire.wires);

  return wires.map((wire) => <Wire key={wire.id} wire={wire} />);
};
