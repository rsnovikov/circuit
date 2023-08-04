import { FC } from 'react';
import { BreadboardCirElement } from '@/entities/breadboard/ui/BreadboardCirElement';
import { useAppSelector } from '@/shared/model';

export const BreadboardPickedElement: FC = () => {
  const pickedElement = useAppSelector((state) => state.breadboard.pickedElement);

  return pickedElement && <BreadboardCirElement element={pickedElement} />;
};
