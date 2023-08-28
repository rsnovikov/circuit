import { FC } from 'react';
import { useAppSelector } from '@/shared/model';
import { SaveBreadboardBtn } from './SaveBreadboardBtn';

export const SaveBreadboard: FC = () => {
  const updatedAt = useAppSelector((state) => state.circuit.updatedAt) as string;

  const date = updatedAt ? new Date(updatedAt).toLocaleString() : '';
  return (
    <div className="flex items-center">
      <div className="mr-2 flex items-center">
        Последнее сохранение:
        <span className="font-medium ml-1">{date.toLocaleString()}</span>
      </div>
      <div>
        <SaveBreadboardBtn />
      </div>
    </div>
  );
};
