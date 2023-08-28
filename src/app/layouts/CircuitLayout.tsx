import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ChangeCircuitNameForm } from '@/features/breadboard/changeCircuitName';
import { SaveBreadboard } from '@/features/breadboard/saveBreadboard';
import { Header } from '@/widgets/header';

export const CircuitLayout: FC = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Header leftSlot={<ChangeCircuitNameForm />} rightSlot={<SaveBreadboard />} />
      <Outlet />
    </div>
  );
};
