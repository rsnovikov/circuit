import { FC } from 'react';
import { BreadboardCirElement } from '@/entities/cirElement/ui/BreadboardCirElement';
import { useAppSelector } from '@/shared/model';

export const BreadboardPickedElement: FC = () => {
  const pickedElement = useAppSelector((state) => state.cirElement.pickedElement);
  return pickedElement && <BreadboardCirElement element={pickedElement} />;
};
