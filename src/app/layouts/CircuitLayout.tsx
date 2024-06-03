import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ChangeCircuitNameForm } from '@/features/breadboard/changeCircuitName';
import { SaveBreadboard } from '@/features/breadboard/saveBreadboard';
import { Header } from '@/widgets/header';
import { useAppSelector } from "@/shared/model";

export const CircuitLayout: FC = () => {
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  return (
    <div className="w-full h-full overflow-hidden">
      <Header leftSlot={<ChangeCircuitNameForm />} rightSlot={isAuthorized && <SaveBreadboard />} />
      <Outlet />
    </div>
  );
};
