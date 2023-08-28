import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '@/shared/model';

export const BreadboardWrapper: FC<PropsWithChildren> = ({ children }) => {
  const scale = useAppSelector((state) => state.circuit.scale);
  const { translateX, translateY } = useAppSelector((state) => state.circuit.translateCoords);
  return (
    <g transform={`matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`}>{children}</g>
  );
};
