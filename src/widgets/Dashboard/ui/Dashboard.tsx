import { FC } from 'react';
import { CreateBreadboardBtn } from '@/features/dashboard/createBreadboard';
import { DashboardCircuitList } from './DashboardCircuitList';

export const Dashboard: FC = () => {
  return (
    <div className="min-h-full w-full pt-16 container mx-auto">
      <h1 className="text-3xl">Ваши схемы</h1>
      <div className="my-5">
        <CreateBreadboardBtn />
      </div>
      <DashboardCircuitList />
    </div>
  );
};
