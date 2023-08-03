import { FC } from 'react';
import { BreadboardCirElement } from '@/entities/breadboard/ui/BreadboardCirElement';
import { useAppSelector } from '@/shared/model';

export const BreadboardPickedElement: FC = () => {
  const pickedElement = useAppSelector((state) => state.breadboard.pickedElement);

  //todo: maybe add special component without terminals for picked element
  return pickedElement && <BreadboardCirElement element={pickedElement} />;
};
