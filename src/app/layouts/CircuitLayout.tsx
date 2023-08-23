import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ChangeBreadboardNameForm } from '@/features/changeBreadboardName';
import { Header } from '@/widgets/header';

export const CircuitLayout: FC = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Header leftSlot={<ChangeBreadboardNameForm />} />
      <Outlet />
    </div>
  );
};
