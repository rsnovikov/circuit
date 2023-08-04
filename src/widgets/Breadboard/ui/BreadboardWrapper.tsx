import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '@/shared/model';

export const BreadboardWrapper: FC<PropsWithChildren> = ({ children }) => {
  const scale = useAppSelector((state) => state.breadboard.scale);
  const { translateX, translateY } = useAppSelector((state) => state.breadboard.translateCoords);
  return (
    <g transform={`matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`}>{children}</g>
  );
};
